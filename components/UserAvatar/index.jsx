import React from 'react';

import { Grid, Typography, useMediaQuery } from '@mui/material';

import styles from './styles';

const UserAvatar = ({ fullName }) => {
  const isMobileScreen = useMediaQuery('(max-width: 800px)');

  const getUserInitials = (name) => {
    if (!name) return '';
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('');
    return initials.toUpperCase();
  };

  return (
    <Grid {...styles.container}>
      <Grid {...styles.userAvatarCircleContainer}>
        <div style={{ ...styles.userAvatarCircle }}>
          <Typography style={{ color: '#fff' }}>
            {getUserInitials(fullName)}
          </Typography>
        </div>
      </Grid>
      <Grid {...styles.nameContainer}>
        {!isMobileScreen && (
          <Typography {...styles.name}>{fullName}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default UserAvatar;
