import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  INDENT_CONTENT_COMMAND, 
  OUTDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  COMMAND_PRIORITY_CRITICAL
} from 'lexical';
import { $isListNode, $getListDepth } from '@lexical/list';
import { $findMatchingParent } from '@lexical/utils';

export default function KeyboardShortcutPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Register tab handler for list indentation
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (event) => {
        // Prevent default tab behavior
        event.preventDefault();

        // Handle tab for list indentation
        const selection = editor.getEditorState().read(() => {
          return editor.getEditorState()._selection;
        });

        if (selection) {
          // Check if we're inside a list
          const isInList = editor.getEditorState().read(() => {
            const anchorNode = selection.anchor.getNode();
            return !!$findMatchingParent(anchorNode, (node) => $isListNode(node));
          });

          if (isInList) {
            // If shift is pressed, outdent, otherwise indent
            if (event.shiftKey) {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            } else {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }
            return true;
          }
        }
        
        // Let the tab key be handled by default behavior if not in a list
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return null;
}
