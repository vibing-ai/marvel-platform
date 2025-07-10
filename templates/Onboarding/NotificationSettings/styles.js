const styles = {
  mainGrid: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      maxWidth: 600,
      py: 8,
      margin: '0 auto',
      minHeight: '70vh',
    },
  },

  titleGrid: {
    item: true,
    xs: 12,
    sx: {
      textAlign: 'center',
    },
  },

  titleProps: {
    variant: 'h4',
    gutterBottom: true,
    sx: {
      fontSize: '32px',
      color: '#fff',
    },
  },

  descriptionProps: {
    sx: {
      mb: 4,
      fontSize: '20px',
      fontWeight: 200,
      color: '#fff',
    },
  },

  switchGrid: {
    container: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    sx: {
      width: '100%',
      maxWidth: 400,
      py: 2,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      '&:last-of-type': {
        borderBottom: 'none',
      },
    },
  },

  labelProps: {
    sx: {
      color: '#fff',
      fontSize: '20px',
      fontWeight: 600,
    },
  },


  switch: {
    '&&': {
      width: 50,
      height: 30,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: '5px',
        color: '#fff', // White thumb in OFF state
        '&.Mui-checked': {
          transform: 'translateX(18px)',
          color: '#8653FF', // Purple thumb in ON state
          '& + .MuiSwitch-track': {
            backgroundColor: 'rgba(134, 83, 255, 0.3)',
            opacity: 1,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        width: 20,
        height: 20,
        // Color controlled by parent switchBase
        boxShadow: 'none',
      },
      '& .MuiSwitch-track': {
        borderRadius: 15,
        backgroundColor: 'rgba(134, 83, 255, 0.3)',
        opacity: 1,
      },
    },
  },

  buttonProps: {
    type: 'submit',
    variant: 'contained',
    fullWidth: true,
    sx: {
      backgroundColor: '#8653FF',
      borderRadius: '30px',
      padding: '16px 82px',
      textTransform: 'none',
      fontSize: 20,
      color: '#fff',
      mt: 4,
      '&:hover': {
        backgroundColor: '#6e3aef',
      },
    },
  },
};

export default styles;
