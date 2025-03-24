import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ParagraphNode, TextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { registerCodeHighlighting } from '@lexical/code';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { useEffect } from 'react';


import ToolbarPlugin from './plugins/ToolbarPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import KeyboardShortcutPlugin from './plugins/KeyboardShortcutPlugin';
import { TextEditorTheme } from './TextEditorTheme';
import styles from './TextEditor.module.css';
import OnChangePlugin from './plugins/OnChangePlugin';
import { CUSTOM_TRANSFORMERS } from './plugins/MarkdownTransformers';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';

const placeholder = 'Enter some rich text...';

// CodeHighlightPlugin for syntax highlighting in code blocks
function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}

const editorConfig = {
  namespace: 'Text Editor',
  nodes: [
    ParagraphNode,
    TextNode,
    LinkNode,
    AutoLinkNode,
    ListNode,
    ListItemNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    HorizontalRuleNode,
    CodeNode,
    CodeHighlightNode,
    HeadingNode,
    QuoteNode,
  ],
  onError(error) {
    throw error;
  },
  theme: TextEditorTheme,
};

const TextEditor = ({ markdown, onChange }) => {
  const initialConfig = {
    ...editorConfig,
    ...(markdown && {
      editorState: () => {
        return $convertFromMarkdownString(markdown, CUSTOM_TRANSFORMERS);
      },
    }),
  };

  return (
    <div className={styles.editorContainer} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div style={{ flexGrow: 1, overflow: 'auto' }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
                style={{ height: '100%', minHeight: '500px' }}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <CodeHighlightPlugin />
        <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />
        {/* <CodeActionMenuPlugin anchorElem={document.body} /> */}
        <ListPlugin />
        <KeyboardShortcutPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
};

export default TextEditor;
