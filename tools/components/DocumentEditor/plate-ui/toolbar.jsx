/* eslint-disable no-unused-expressions */
import * as React from 'react';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { withCn } from '@udecode/cn';

import useToolbarFunctionsHook from '../../../libs/hooks/useToolbarFunctions';

import AlignDropdownMenu from './AlignDropdownMenu';
import CodeBlockButton from './CodeBlockButton';
import FontSize from './FontSizeDropdown';
import FontStyle from './FontStyle';
import LinkToolbarButton from './LinkToolbarButton';
import ListDropdownMenu from './ListDropdownMenu';
import TextStyle from './TextStyle';
import ToolbarSeparator from './ToolbarSeparator';
import UndoRedo from './UndoRedo';

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'flex items-center bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg'
);

export const EditorToolbar = (props) => {
  const { editor } = props;

  const {
    checkMarkActive,
    checkBlockActive,
    handleToggleMark,
    handleToggleBlock,
    getCurrentFontSize,
    handleUndo,
    handleRedo,
  } = useToolbarFunctionsHook(editor);

  if (!editor) return null;

  return (
    <Toolbar className="slate-toolbar">
      <UndoRedo handleUndo={handleUndo} handleRedo={handleRedo} />
      <ToolbarSeparator />
      <div className="slate-btn-container">
        <FontStyle
          editor={editor}
          isBlockActive={checkBlockActive}
          toggleBlock={handleToggleBlock}
        />
        <FontSize
          editor={editor}
          getCurrentFontSize={getCurrentFontSize}
          checkMarkActive={checkMarkActive}
        />
        <ToolbarSeparator />
        <TextStyle
          editor={editor}
          isMarkActive={checkMarkActive}
          toggleMark={handleToggleMark}
        />
        <ToolbarSeparator />
        <ListDropdownMenu
          editor={editor}
          isBlockActive={checkBlockActive}
          toggleBlock={handleToggleBlock}
        />
        <AlignDropdownMenu />
        <ToolbarSeparator />
        <LinkToolbarButton />
        <CodeBlockButton editor={editor} />
      </div>
    </Toolbar>
  );
};

export default EditorToolbar;
