import React, { useCallback } from 'react';

import CodeIcon from '@mui/icons-material/Code';

import { ToolbarButton } from './ToolbarButton';

/**
 * Toolbar button to convert selected text into a code block
 * @param {Object} props - Component props
 * @param {Object} props.editor - Plate editor instance
 * @returns {JSX.Element} CodeBlock toolbar button
 */
const CodeBlockButton = ({ editor }) => {
  // Check if the current selection is in a code block
  const isCodeBlockActive = useCallback(() => {
    if (!editor || !editor.selection) return false;

    try {
      const [match] = editor.nodes({
        match: (n) => n.type === 'code_block',
      });

      return !!match;
    } catch (error) {
      return false;
    }
  }, [editor]);

  const handleClick = useCallback(() => {
    if (!editor || !editor.selection) return;

    try {
      const isActive = isCodeBlockActive();

      if (isActive) {
        // If already a code block, convert back to paragraph
        const [codeBlock] = editor.nodes({
          match: (n) => n.type === 'code_block',
        });

        if (codeBlock) {
          const [, path] = codeBlock;

          // First convert code_line nodes to paragraph nodes
          const codeLines = [
            ...editor.nodes({
              at: path,
              match: (n) => n.type === 'code_line',
            }),
          ];

          codeLines.forEach(([, codePath]) => {
            editor.setNodes({ type: 'paragraph' }, { at: codePath });
          });

          // Then unwrap the code_block
          editor.unwrapNodes({
            match: (n) => n.type === 'code_block',
            split: true,
          });
        }
      } else {
        // Convert to code block
        const DEFAULT_LANGUAGE = 'javascript';

        // Get all block nodes in the current selection
        const blockEntries = [
          ...editor.nodes({
            match: (n) =>
              editor.isBlock(n) &&
              n.type !== 'code_block' &&
              n.type !== 'code_line',
            mode: 'highest', // Only get the highest level blocks
          }),
        ];

        if (blockEntries.length > 0) {
          // Create a code block that will contain all selected lines
          const codeBlock = {
            type: 'code_block',
            language: DEFAULT_LANGUAGE,
            children: [],
          };


          blockEntries.forEach(([, path]) => {
            editor.setNodes(
              {
                type: 'code_line',
              },
              {
                at: path,
              }
            );
          });

          // Wrap all converted blocks with a single code_block
          editor.wrapNodes(codeBlock, {
            match: (n) => n.type === 'code_line',
            split: true,
          });
        } else {
          // If no blocks found, insert a new code block
          editor.insertNodes({
            type: 'code_block',
            language: DEFAULT_LANGUAGE,
            children: [
              {
                type: 'code_line',
                children: [{ text: '' }],
              },
            ],
          });
        }
      }

      // Force editor to update
      setTimeout(() => {
        editor.onChange();
      }, 0);
    } catch (error) {
      console.error('Error toggling code block:', error);
    }
  }, [editor, isCodeBlockActive]);

  return (
    <ToolbarButton
      tooltip="Code Block"
      onClick={handleClick}
      isActive={isCodeBlockActive()}
      className="slate-btn"
    >
      <CodeIcon className="h-5 w-5" />
    </ToolbarButton>
  );
};

export default CodeBlockButton;
