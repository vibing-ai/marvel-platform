import * as React from 'react';

import { ArrowDropDown as DropdownArrowIcon } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import H1Icon from '../../../../assets/svg/header1.svg';
import H2Icon from '../../../../assets/svg/header2.svg';
import H3Icon from '../../../../assets/svg/header3.svg';
import ParagraphIcon from '../../../../assets/svg/paragraph.svg';

const FontStyle = (props) => {
  const { editor, isBlockActive, toggleBlock } = props;
  const [fontStyleAnchorEl, setFontStyleAnchorEl] = React.useState(null);
  const openFontStyle = Boolean(fontStyleAnchorEl);

  // Font Style Handlers
  const handleFontStyleMenuOpen = (event) => {
    setFontStyleAnchorEl(event.currentTarget);
  };

  const handleFontStyleMenuClose = () => {
    setFontStyleAnchorEl(null);
  };

  const handleFontStyleSelect = (fontStyle) => {
    toggleBlock(fontStyle);
    handleFontStyleMenuClose();
  };

  return (
    <div className="slate-toolbar-group flex items-center">
      <IconButton
        id="font-style-button"
        aria-controls={openFontStyle ? 'font-style-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openFontStyle ? 'true' : undefined}
        onClick={handleFontStyleMenuOpen}
        className="list-style-dropdown flex items-center"
      >
        <ParagraphIcon className="mr-1 list-style-dropdown" />
      </IconButton>
      <DropdownArrowIcon className="dropdown-arrow" />

      <Menu
        id="font-style-menu"
        anchorEl={fontStyleAnchorEl}
        open={openFontStyle}
        onClose={handleFontStyleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'font-style-button',
        }}
        PaperProps={{
          className: 'marvel-list-dropdown',
        }}
      >
        <Typography className="list-text">Text</Typography>
        <MenuItem
          onClick={() => handleFontStyleSelect('h1')}
          className={`list-option ${isBlockActive('h1') ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <H1Icon />
          </ListItemIcon>
          <ListItemText primary="H1 Header" />
        </MenuItem>
        <MenuItem
          onClick={() => handleFontStyleSelect('h2')}
          className={`list-option ${isBlockActive('h2') ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <H2Icon />
          </ListItemIcon>
          <ListItemText primary="H2 Header" />
        </MenuItem>
        <MenuItem
          onClick={() => handleFontStyleSelect('h3')}
          className={`list-option ${isBlockActive('h3') ? 'is-active' : ''}`}
        >
          <ListItemIcon>
            <H3Icon />
          </ListItemIcon>
          <ListItemText primary="H3 Header" />
        </MenuItem>
        <MenuItem
          onClick={() => handleFontStyleSelect('paragraph')}
          className={`list-option ${
            isBlockActive('paragraph') ? 'is-active' : ''
          }`}
        >
          <ListItemIcon>
            <ParagraphIcon />
          </ListItemIcon>
          <ListItemText primary="Paragraph" />
        </MenuItem>
      </Menu>
    </div>
  );
};
export default FontStyle;
