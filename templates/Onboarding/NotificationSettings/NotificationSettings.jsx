// NotificationSettings/NotificationSettings.jsx
import React, { useState } from 'react';
import { Switch, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import stylesOnboarding from '../styles.js';
import styles from './styles';

const StyledSwitch = styled(Switch)(styles.switch);

const NotificationSettings = ({ onNext, tempData }) => {
  const [emailNotifications, setEmailNotifications] = useState(
    tempData?.emailNotifications ?? true
  );
  const [pushNotifications, setPushNotifications] = useState(
    tempData?.pushNotifications ?? true
  );

  const handleFinish = () => {
    const preferences = {
      emailNotifications,
      pushNotifications,
    };
    onNext(preferences);
  };

  const renderTitle = () => (
    <Grid {...styles.titleGrid}>
      <Typography {...stylesOnboarding.titleProps}>System Configurations</Typography>
      <Typography {...stylesOnboarding.descriptionProps}>
        We need some permissions to get you started
      </Typography>
    </Grid>
  );

  const renderSwitch = (label, value, onChange) => (
    <Grid {...styles.switchGrid}>
      <Typography {...styles.labelProps}>{label}</Typography>
      <StyledSwitch checked={value} onChange={(e) => onChange(e.target.checked)} />
    </Grid>
  );

  return (
    <Grid {...stylesOnboarding.mainGrid}>
      {renderTitle()}
      {renderSwitch(
        'Enable Email Notifications',
        emailNotifications,
        setEmailNotifications
      )}
      {renderSwitch(
        'Enable Push Notifications',
        pushNotifications,
        setPushNotifications
      )}
      <Button 
        onClick={handleFinish}
        {...stylesOnboarding.buttonProps}
      >
        Next
      </Button>
    </Grid>
  );
};

export default NotificationSettings;