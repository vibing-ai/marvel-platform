// NotificationSettings/NotificationSettings.jsx
import React, { useState } from 'react';
import { Switch, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
      <Typography {...styles.titleProps}>System Configurations</Typography>
      <Typography {...styles.descriptionProps}>
        We need some permissions to get you started
      </Typography>
    </Grid>
  );

  const renderSwitch = (label, value, onChange) => (
    <Grid container {...styles.switchGrid}>
      <Grid item>
        <Typography {...styles.labelProps}>{label}</Typography>
      </Grid>
      <Grid item>
        <StyledSwitch checked={value} onChange={(e) => onChange(e.target.checked)} />
      </Grid>
    </Grid>
  );

  return (
    <Grid container {...styles.mainGrid}>
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
        {...styles.buttonProps}
      >
        Next
      </Button>
    </Grid>
  );
};

export default NotificationSettings;