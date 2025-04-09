/**
 * Utility functions for Plate editor toolbars
 * Shared between main toolbar and contextual toolbar
 */
const logWarning = (message, error) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(message, error);
  }
};

const handleError = (error, context) => {
  logWarning(`Editor toolbar error (${context}):`, error);
};

/**
 * Checks if a mark is active at the current selection
 * @param {Object} editor - The Plate editor instance
 * @param {String} format - The mark format to check
 * @returns {Boolean} - Whether the mark is active
 */
export const isMarkActive = (editor, format) => {
  if (!editor || !editor.selection) return false;

  try {
    const [match] = editor.nodes({
      match: (node) => node[format] === true,
      at: editor.selection,
    });
    return !!match;
  } catch (error) {
    handleError(error, `checking mark active state (${format})`);
    return false;
  }
};

/**
 * Checks if a block type is active at the current selection
 * @param {Object} editor - The Plate editor instance
 * @param {String} type - The block type to check
 * @returns {Boolean} - Whether the block type is active
 */
export const isBlockActive = (editor, type) => {
  if (!editor || !editor.selection) return false;

  try {
    const [match] = editor.nodes({
      match: (node) => node.type === type,
      at: editor.selection,
    });
    return !!match;
  } catch (error) {
    handleError(error, `checking block active state (${type})`);
    return false;
  }
};

/**
 * Toggles a mark at the current selection
 * @param {Object} editor - The Plate editor instance
 * @param {String} format - The mark format to toggle
 */
export const toggleMark = (editor, format) => {
  if (!editor || !format) return;

  try {
    if (isMarkActive(editor, format)) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  } catch (error) {
    handleError(error, `toggling mark (${format})`);
  }
};

/**
 * Toggles a block type at the current selection
 * @param {Object} editor - The Plate editor instance
 * @param {String} type - The block type to toggle
 */
export const toggleBlock = (editor, type) => {
  if (!editor || !editor.selection) return;

  try {
    const [currentNodeEntry] = editor.nodes({
      match: (n) => n.type,
      at: editor.selection,
    });

    if (!currentNodeEntry) return;

    const [currentNode] = currentNodeEntry;
    const currentAlign = currentNode.align || 'left';
    const isHeading = currentNode.type && currentNode.type.startsWith('h');

    if (type === 'ul' || type === 'ol') {
      if (currentNode.type === type) {
        editor.setNodes({
          type: 'paragraph',
          align: currentAlign,
        });
      } else {
        editor.setNodes({
          type,
          align: currentAlign,
        });
      }
    } else if (type === 'action_item') {
      editor.setNodes({
        type: 'action_item',
        checked: false,
      });
    } else if (type.startsWith('h')) {
      if (isHeading && currentNode.type === type) {
        editor.setNodes({
          type: 'paragraph',
          align: currentAlign,
        });
      } else {
        editor.setNodes({
          type,
          align: currentAlign,
        });
      }
    } else {
      editor.setNodes({
        type: isBlockActive(editor, type) ? 'paragraph' : type,
        align: currentAlign,
      });
    }
  } catch (error) {
    handleError(error, `toggling block (${type})`);
  }
};

/**
 * Sets the alignment for the current selection
 * @param {Object} editor - The Plate editor instance
 * @param {String} alignment - The alignment to set (left, center, right, justify)
 */
export const setAlignment = (editor, alignment) => {
  if (!editor || !alignment) return;

  try {
    editor.setNodes({ align: alignment });
  } catch (error) {
    handleError(error, `setting alignment (${alignment})`);
  }
};

/**
 * Gets the current font size from the editor
 * @param {Object} editor - The Plate editor instance
 * @returns {String} - The current font size with unit (e.g. "14 pt")
 */
export const getCurrentFontSize = (editor) => {
  if (!editor) return '14 pt';

  try {
    const marks = editor.getMarks() || {};
    return marks.fontSize ? `${marks.fontSize} pt` : '14 pt';
  } catch (error) {
    handleError(error, 'getting current font size');
    return '14 pt';
  }
};

/**
 * Performs undo operation
 * @param {Object} editor - The Plate editor instance
 */
export const performUndo = (editor) => {
  if (!editor) return;

  try {
    editor.undo();
  } catch (error) {
    handleError(error, 'performing undo operation');
  }
};

/**
 * Performs redo operation
 * @param {Object} editor - The Plate editor instance
 */
export const performRedo = (editor) => {
  if (!editor) return;

  try {
    editor.redo();
  } catch (error) {
    handleError(error, 'performing redo operation');
  }
};

// Create a comprehensive hook that provides all toolbar functions
const useToolbarFunctions = (editor) => {
  return {
    checkMarkActive: (format) => isMarkActive(editor, format),
    checkBlockActive: (type) => isBlockActive(editor, type),
    handleToggleMark: (format) => toggleMark(editor, format),
    handleToggleBlock: (type) => toggleBlock(editor, type),
    handleSetAlignment: (alignment) => setAlignment(editor, alignment),
    getCurrentFontSize: () => getCurrentFontSize(editor),
    handleUndo: () => performUndo(editor),
    handleRedo: () => performRedo(editor),
  };
};

export default useToolbarFunctions;
