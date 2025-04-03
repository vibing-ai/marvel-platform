'use client';

import React from 'react';

import {
  FormatAlignCenter as CenterAlignIcon,
  ArrowDropDown as DropdownArrowIcon,
  FormatAlignJustify as JustifyAlignIcon,
  FormatAlignLeft as LeftAlignIcon,
  FormatAlignRight as RightAlignIcon,
} from '@mui/icons-material';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useEditorRef, useSelectionFragmentProp } from '@udecode/plate/react';
import { setAlign } from '@udecode/plate-alignment';
import { useDispatch, useSelector } from 'react-redux';

import { ToolbarButton } from './ToolbarButton';

import { actions as toolActions } from '@/tools/data';

const items = [
  {
    icon: LeftAlignIcon,
    value: 'left',
  },
  {
    icon: CenterAlignIcon,
    value: 'center',
  },
  {
    icon: RightAlignIcon,
    value: 'right',
  },
  {
    icon: JustifyAlignIcon,
    value: 'justify',
  },
];
const STRUCTURAL_TYPES = [
  'paragraph',
  'heading',
  'blockquote',
  'code_block',
  'list_item',
];

const AlignDropdownMenu = (props) => {
  const dispatch = useDispatch();
  const { alignMenuOpen } = useSelector((state) => state.tools);

  const editor = useEditorRef();
  const value = useSelectionFragmentProp({
    defaultValue: 'start',
    structuralTypes: STRUCTURAL_TYPES,
    getProp: (node) => node.align,
  });

  const handleClick = (event) => {
    dispatch(toolActions.setAlignMenuOpen(true));
  };

  const handleClose = () => {
    dispatch(toolActions.setAlignMenuOpen(false));
  };

  const handleAlignChange = (newAlignment) => {
    // Check if editor and selection exist before setting alignment
    if (editor && editor.selection) {
      setAlign(editor, { value: newAlignment });

      // Use Plate.js method to ensure editor interaction
      editor.select(editor.selection);
    }

    handleClose();
  };

  const IconValue =
    items.find((item) => item.value === value)?.icon ?? LeftAlignIcon;

  return (
    <div>
      <ToolbarButton
        onClick={handleClick}
        tooltip="Align"
        pressed={alignMenuOpen}
        className="slate-btn"
      >
        <IconValue />
      </ToolbarButton>
      <Menu
        open={alignMenuOpen}
        onClose={handleClose}
        anchorReference="none"
        PaperProps={{
          style: {
            position: 'fixed',
            top: '44%',
            left: '64%',
            transform: 'translate(-50%, -50%)',
          },
          className: 'marvel-list-dropdown',
        }}
      >
        <Typography className="list-text">Alignment</Typography>
        {items.map(({ icon: Icon, value: itemValue }) => (
          <MenuItem
            key={itemValue}
            onClick={() => handleAlignChange(itemValue)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Icon style={{ marginRight: 8 }} />
            {itemValue} Align
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default AlignDropdownMenu;
