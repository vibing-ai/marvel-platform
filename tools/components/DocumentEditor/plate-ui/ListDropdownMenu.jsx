import React, { useState } from 'react';

import { ArrowDropDown as DropdownArrowIcon } from '@mui/icons-material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

const ListDropdownMenu = ({ editor, isBlockActive, toggleBlock }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleListTypeChange = (type) => {
    toggleBlock(type);
    handleCloseMenu();
  };

  // Determine which list type is currently active
  const getBulletedActive = () => isBlockActive('ul');
  const getNumberedActive = () => isBlockActive('ol');
  const getCheckboxActive = () => isBlockActive('action_item');

  // Determine which icon to show in the dropdown button
  const getActiveIcon = () => {
    if (getBulletedActive()) return <FormatListBulleted className="h-5 w-5" />;
    if (getNumberedActive()) return <FormatListNumbered className="h-5 w-5" />;
    if (getCheckboxActive()) return <ChecklistIcon className="h-5 w-5" />;

    // Default icon when no list is active
    return <FormatListBulleted className="h-5 w-5" />;
  };

  return (
    <div className="slate-toolbar-group flex items-center">
      <IconButton
        id="list-button"
        aria-controls={open ? 'list-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
        className="list-style-dropdown flex items-center"
      >
        {getActiveIcon()}
      </IconButton>
      <DropdownArrowIcon className="dropdown-arrow" />

      <Menu
        id="list-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'list-button',
        }}
        PaperProps={{
          className: 'marvel-list-dropdown',
        }}
      >
        <Typography className="list-text-font">List Type</Typography>

        <MenuItem
          onClick={() => handleListTypeChange('ul')}
          className={`list-option ${getBulletedActive() ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary="Bulleted List" />
        </MenuItem>

        <MenuItem
          onClick={() => handleListTypeChange('ol')}
          className={`list-option ${getNumberedActive() ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <FormatListNumbered />
          </ListItemIcon>
          <ListItemText primary="Numbered List" />
        </MenuItem>

        <MenuItem
          onClick={() => handleListTypeChange('action_item')}
          className={`list-option ${getCheckboxActive() ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary="To-Do List" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ListDropdownMenu;
