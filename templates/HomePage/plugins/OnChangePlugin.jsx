/**
 * OnChangePlugin for Lexical Editor
 * Converts editor content to markdown and calls onChange callback
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $convertToMarkdownString } from '@lexical/markdown';
import { CUSTOM_TRANSFORMERS } from './MarkdownTransformers';

export default function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onChange) {
      return;
    }

    // Register update listener to convert content to markdown
    const removeUpdateListener = editor.registerUpdateListener(() => {
      editor.update(() => {
        try {
          const markdown = $convertToMarkdownString(CUSTOM_TRANSFORMERS);
          onChange(markdown);
        } catch (error) {
          console.error('Error converting to markdown:', error);
        }
      });
    });

    // Initial conversion
    editor.update(() => {
      const markdown = $convertToMarkdownString(CUSTOM_TRANSFORMERS);
      onChange(markdown);
    });

    return () => {
      removeUpdateListener();
    };
  }, [editor, onChange]);

  return null;
}
