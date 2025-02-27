import React from 'react';

import { Alert, Button, Grid, Snackbar } from '@mui/material';

const UnsavedChangesAlert = ({ onSave, onRevert }) => (
  <Grid container spacing={2} sx={{ marginBottom: 2}}>
    <Grid item xs={12}>
      <Alert
        severity="warning"
        action={
          <Grid container spacing={1}>
            <Grid item>
              <Button
                color="inherit"
                size="small"
                onClick={onRevert}
                sx={{
                  color: 'white',
                  minWidth: 'auto',
                  background:
                    'linear-gradient(90deg, #7F77FF 0%, #AC92FF 100%)',
                }}
              >
                Revert
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                size="small"
                onClick={onSave}
                sx={{
                  color: 'white',
                  minWidth: 'auto',
                  background:
                    'linear-gradient(90deg, #7F77FF 0%, #AC92FF 100%)',
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        }
      >
        You have unsaved changes
      </Alert>
    </Grid>
  </Grid>
);

export default UnsavedChangesAlert;
