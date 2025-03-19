/* eslint-disable no-unused-expressions */
import * as React from 'react';

import { ArrowDropDown as DropdownArrowIcon } from '@mui/icons-material';

import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn } from '@udecode/cn';

import { cva } from 'class-variance-authority';

import useToolbarFunctionsHook from '../../../libs/hooks/useToolbarFunctions';

import AlignDropdownMenu from './AlignDropdownMenu';
import CodeBlockButton from './CodeBlockButton';
import FontStyle from './FontStyle';
import LinkToolbarButton from './LinkToolbarButton';
import ListDropdownMenu from './ListDropdownMenu';
import TextStyle from './TextStyle';
import ToolbarSeparator from './ToolbarSeparator';
import { withTooltip } from './tooltip';
import UndoRedo from './UndoRedo';

const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-white/80 hover:bg-gray-700 hover:text-white transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
      },
      variant: {
        default: 'bg-transparent',
        active: 'bg-gray-700 text-white',
      },
    },
  }
);

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'flex items-center bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg'
);

export const ToolbarButton = withTooltip(
  React.forwardRef(
    (
      { children, className, tooltip, isActive, onClick, ...restProps },
      ref
    ) => (
      <ToolbarPrimitive.Button
        ref={ref}
        className={cn(
          toolbarButtonVariants({ variant: isActive ? 'active' : 'default' }),
          className
        )}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </ToolbarPrimitive.Button>
    )
  )
);

export const EditorToolbar = (props) => {
  const { editor } = props;
  if (!editor) return null;
  // const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [alignmentAnchorEl, setAlignmentAnchorEl] = React.useState(null);
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = React.useState(null);
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

  const openFontSize = Boolean(fontSizeAnchorEl);
  const open = Boolean(anchorEl);

  const handleListMenuClose = () => {
    setAnchorEl(null);
  };

  const handleListStyleSelect = (blockType) => {
    if (blockType) {
      handleToggleBlock(blockType);
      handleListMenuClose();
    }
  };

  const handleFontSizeMenuOpen = (event) => {
    setFontSizeAnchorEl(event.currentTarget);
  };

  const handleFontSizeMenuClose = () => {
    setFontSizeAnchorEl(null);
  };

  const handleFontSizeSelect = (fontSizeStr) => {
    const size = parseInt(fontSizeStr.replace('fontSize', ''), 10);
    if (!Number.isNaN(size)) {
      editor.addMark('fontSize', size);
    }
    handleFontSizeMenuClose();
  };

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
        <div className="slate-toolbar-group flex items-center">
          <IconButton
            id="font-size-button"
            aria-controls={openFontSize ? 'font-size-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFontSize ? 'true' : undefined}
            onClick={handleFontSizeMenuOpen}
            className="list-style-dropdown flex items-center"
          >
            <Typography className="mr-1 list-style-dropdown">
              {getCurrentFontSize()}
            </Typography>
          </IconButton>
          <DropdownArrowIcon className="dropdown-arrow" />

          <Menu
            id="font-size-menu"
            anchorEl={fontSizeAnchorEl}
            open={openFontSize}
            onClose={handleFontSizeMenuClose}
            MenuListProps={{
              'aria-labelledby': 'font-size-button',
            }}
            PaperProps={{
              className: 'marvel-list-dropdown',
              style: { maxHeight: '400px' },
            }}
          >
            <Typography className="list-text-font">Font Size</Typography>
            {[8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96].map((size) => (
              <MenuItem
                key={size}
                onClick={() => handleFontSizeSelect(`fontSize${size}`)}
                className={`list-option ${
                  checkMarkActive(`fontSize${size}`) ? 'is-active' : ''
                }`}
              >
                <ListItemText
                  primary={`${size} pt`}
                  style={{ fontSize: `${Math.min(size, 24)}px` }}
                />
              </MenuItem>
            ))}
          </Menu>
        </div>
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
