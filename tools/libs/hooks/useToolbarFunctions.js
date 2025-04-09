import { useMemo } from 'react';

import {
  getCurrentFontSize,
  isBlockActive,
  isMarkActive,
  setAlignment,
  toggleBlock,
  toggleMark,
} from '../utils/toolbarUtils';

/**
 * Custom hook to provide toolbar functions bound to a specific editor instance
 *
 * @param {Object} editor - The Plate editor instance
 * @returns {Object} - Object containing all toolbar functions
 */
export const useToolbarFunctions = (editor) => {
  // Only recreate the functions when the editor instance changes
  return useMemo(() => {
    if (!editor) {
      return {
        checkMarkActive: () => false,
        checkBlockActive: () => false,
        handleToggleMark: () => {},
        handleToggleBlock: () => {},
        handleSetAlignment: () => {},
        getCurrentFontSize: () => '14 pt',
        handleUndo: () => {},
        handleRedo: () => {},
      };
    }

    return {
      checkMarkActive: (format) => isMarkActive(editor, format),
      checkBlockActive: (type) => isBlockActive(editor, type),
      handleToggleMark: (format) => toggleMark(editor, format),
      handleToggleBlock: (type) => toggleBlock(editor, type),
      handleSetAlignment: (alignment) => setAlignment(editor, alignment),
      getCurrentFontSize: () => getCurrentFontSize(editor),
      handleUndo: () => editor.undo(),
      handleRedo: () => editor.redo(),
    };
  }, [editor]);
};

export default useToolbarFunctions;
