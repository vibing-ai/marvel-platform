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
import { useDispatch } from 'react-redux';

import AlignDropdownMenu from './AlignDropdownMenu';
import FontStyle from './FontStyle';
import LinkToolbarButton from './LinkToolbarButton';
import ListToolbarButton from './ListToolbarButton';
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

const handleError = (error, context) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Editor toolbar error (${context}):`, error);
  }
};

export const EditorToolbar = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alignmentAnchorEl, setAlignmentAnchorEl] = React.useState(null);
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = React.useState(null);

  const { editor } = props;
  if (!editor) return null;

  const handleUndo = () => editor.undo();
  const handleRedo = () => editor.redo();

  const open = Boolean(anchorEl);
  const openFontSize = Boolean(fontSizeAnchorEl);

  const setAlignment = (alignment) => {
    if (editor && alignment) {
      editor.setNodes({ align: alignment });
    }
  };

  const isMarkActive = (format) => {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = editor.nodes({
      match: (node) => node[format] === true,
      at: selection,
    });
    return !!match;
  };

  const isBlockActive = (type) => {
    const { selection } = editor;
    if (!selection) return false;
    try {
      const [match] = editor.nodes({
        match: (node) => node.type === type,
        at: selection,
      });
      return !!match;
    } catch (error) {
      handleError(error, 'isBlockActive');
      return false;
    }
  };

  const toggleMark = (format) => {
    if (!format) return;
    isMarkActive(format)
      ? editor.removeMark(format)
      : editor.addMark(format, true);
  };

  const toggleBlock = (type) => {
    try {
      const { selection } = editor;
      if (!selection) return;

      const [currentNodeEntry] = editor.nodes({
        match: (n) => n.type,
        at: selection,
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
          type: isBlockActive(type) ? 'paragraph' : type,
          align: currentAlign,
        });
      }
    } catch (error) {
      handleError(error, 'toggleBlock');
    }
  };

  const handleListMenuClose = () => {
    setAnchorEl(null);
  };

  const handleListStyleSelect = (blockType) => {
    if (blockType) {
      toggleBlock(blockType);
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
    if (!isNaN(size)) {
      editor.addMark('fontSize', size);
    }
    handleFontSizeMenuClose();
  };

  // const getCurrentFontSize = () => {
  //   const marks = editor?.getMarks() || {};
  //   return marks.fontSize ? `${marks.fontSize} pt` : '14 pt';
  // };

  return (
    <Toolbar className="slate-toolbar">
      <UndoRedo handleUndo={handleUndo} handleRedo={handleRedo} />

      <ToolbarSeparator />
      <div className="slate-btn-container">
        <FontStyle
          editor={editor}
          isBlockActive={isBlockActive}
          toggleBlock={toggleBlock}
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
            {/* Needs a rework */}
            <Typography className="mr-1 list-style-dropdown">
              14 pt
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
                  isMarkActive(`fontSize${size}`) ? 'is-active' : ''
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
          isMarkActive={isMarkActive}
          toggleMark={toggleMark}
        />

        <ToolbarSeparator />

        <div className="slate-toolbar-group flex items-center">
          <ListToolbarButton
            key="bulleted-list"
            nodeType="ul"
            editor={editor}
            isActive={isBlockActive('ul')}
            onClick={() => toggleBlock('ul')}
          />
          <ListToolbarButton
            key="numbered-list"
            nodeType="ol"
            editor={editor}
            isActive={isBlockActive('ol')}
            onClick={() => toggleBlock('ol')}
          />
          <ListToolbarButton
            key="todo-list"
            nodeType="action_item"
            editor={editor}
            isActive={isBlockActive('action_item')}
            onClick={() => toggleBlock('action_item')}
          />
        </div>

        <AlignDropdownMenu />

        <ToolbarSeparator />

        <LinkToolbarButton />
      </div>
    </Toolbar>
  );
};

export default EditorToolbar;
