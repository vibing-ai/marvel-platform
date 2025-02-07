import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { useRouter } from 'next/router';

import { PAGES } from '../NavMenu/NavMenu';

import styles from './styles';

const HamburgerMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <IconButton onClick={handleClick} {...styles.buttonProps}>
        <MenuIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={styles.menuProps.PaperProps}
      >
        {PAGES.map((page) => (
          <MenuItem
            key={page.id}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              router.push(page.link);
            }}
          >
            {page.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HamburgerMenu;
