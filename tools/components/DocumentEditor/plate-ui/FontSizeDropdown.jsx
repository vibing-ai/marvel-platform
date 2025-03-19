import * as React from 'react';

import { ArrowDropDown as DropdownArrowIcon } from '@mui/icons-material';
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

/**
 * FontSizeDropdown Component
 *
 * A reusable component for font size selection in toolbars
 *
 * @param {Object} props - Component props
 * @param {Object} props.editor - The Plate editor instance
 * @param {Function} props.getCurrentFontSize - Function to get current font size
 * @param {Function} props.checkMarkActive - Function to check if a mark is active
 * @param {String} props.className - Additional class names for styling
 * @param {Boolean} props.compact - If true, renders a more compact version for contextual toolbar
 */
const FontSizeDropdown = ({
  editor,
  getCurrentFontSize,
  checkMarkActive,
  className = '',
}) => {
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = React.useState(null);
  const openFontSize = Boolean(fontSizeAnchorEl);

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

  // Font sizes array
  const fontSizes = [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96];

  return (
    <div className={`slate-toolbar-group flex items-center ${className}`}>
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
        <DropdownArrowIcon className="dropdown-arrow" />
      </IconButton>

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
        {fontSizes.map((size) => (
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
  );
};

export default FontSizeDropdown;
