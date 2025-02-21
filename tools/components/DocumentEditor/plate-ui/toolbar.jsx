import * as React from 'react';

import {
  FormatQuote as BlockQuoteIcon,
  FormatBold as BoldIcon,
  FormatListBulleted as BulletListIcon,
  FormatItalic as ItalicIcon,
  FormatListNumbered as NumberedListIcon,
  FormatUnderlined as UnderlineIcon,
} from '@mui/icons-material';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn } from '@udecode/cn';
import { cva } from 'class-variance-authority';

import { useDispatch } from 'react-redux';

import ToolbarSeparator from './ToolbarSeparator';
import { withTooltip } from './tooltip';

import { actions as toolActions } from '@/tools/data';

const { undo, redo } = toolActions;

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

const ToolbarButton = withTooltip(
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


  const dispatch = useDispatch();
  const handleUndo = () => dispatch(undo());
  const handleRedo = () => dispatch(redo());

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
    } catch {
      return false;
    }
  };

  const toggleMark = (format) => {
    isMarkActive(format)
      ? editor.removeMark(format)
      : editor.addMark(format, true);
  };

  const toggleBlock = (type) => {
    try {
      editor.setNodes({ type: isBlockActive(type) ? 'paragraph' : type });
    } catch (error) {
      console.warn(`Toolbar: Error toggling ${type}:`, error);
    }
  };

  return (
    <Toolbar className="slate-toolbar">
      {/* <ToolbarSeparator /> */}
      {/* Paragraph/Block Type Selection - MOVED TO THE FRONT */}
      {/* <FormControl 
        variant="standard" 
        className="slate-dropdown"
        sx={{ 
          minWidth: 120, 
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: 'transparent',
            '&:focus': {
              backgroundColor: 'rgba(55, 65, 81, 0.5)',
            }
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'rgba(255,255,255,0.3)',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'white',
          }
        }}
      >
        <Select
          value={headingLevel}
          onChange={(e) => toggleBlock(e.target.value)}
          displayEmpty
          IconComponent={DropdownIcon}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <div className="flex items-center text-gray-300">
                  <HeadingIcon className="mr-2" />
                  Paragraph
                </div>
              );
            }
            return headingOptions.find(opt => opt.value === selected)?.label;
          }}
        >
          {headingOptions.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              sx={{
                '&:hover': {
                  backgroundColor: '#3E3A4B',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0C0B17',
                }
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <div className="slate-btn-container">
        <ToolbarSeparator />
        <div className="slate-toolbar-group">
          <ToolbarButton
            tooltip="Bold"
            isActive={isMarkActive('bold')}
            onClick={() => toggleMark('bold')}
            className={`slate-btn ${isMarkActive('bold') ? 'is-active' : ''}`}
          >
            <BoldIcon className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Italic"
            isActive={isMarkActive('italic')}
            onClick={() => toggleMark('italic')}
            className={`slate-btn ${isMarkActive('italic') ? 'is-active' : ''}`}
          >
            <ItalicIcon className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Underline"
            isActive={isMarkActive('underline')}
            onClick={() => toggleMark('underline')}
            className={`slate-btn ${isMarkActive('underline') ? 'is-active' : ''}`}
          >
            <UnderlineIcon className="h-5 w-5" />
          </ToolbarButton>
        </div>
        <ToolbarSeparator />
        <div className="slate-toolbar-group">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
          {/* <ToolbarButton
            tooltip="Bullet List"
            isActive={isBlockActive('bulletList')}
            onClick={() => toggleBlock('bulletList')}
            className={`slate-btn ${isBlockActive('bulletList') ? 'is-active' : ''}`}
          >
            <BulletListIcon className="h-5 w-5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Numbered List"
            isActive={isBlockActive('numberedList')}
            onClick={() => toggleBlock('numberedList')}
            className={`slate-btn ${isBlockActive('numberedList') ? 'is-active' : ''}`}
          >
            <NumberedListIcon className="h-5 w-5" />
          </ToolbarButton> */}
        </div>
         {/* <ToolbarButton
          tooltip="Block Quote"
          isActive={isBlockActive('blockquote')}
          onClick={() => toggleBlock('blockquote')}
          className={`slate-btn ${isBlockActive('blockquote') ? 'is-active' : ''}`}
        >
          <BlockQuoteIcon className="h-5 w-5" />
        </ToolbarButton> */}
        <ToolbarSeparator />
        {/* <ToolbarButton
          tooltip="Block Quote"
          isActive={isBlockActive('blockquote')}
          onClick={() => toggleBlock('blockquote')}
        >
          <BlockQuoteIcon className="h-5 w-5" />
        </ToolbarButton> */}
      </div>
    </Toolbar>
  );
};
