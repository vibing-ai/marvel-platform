const styles = {
  buttonProps: {
    sx: (theme) => ({
      color: '#AC92FF',
      [theme.breakpoints.up('laptop')]: {
        display: 'none',
      },
    }),
  },
  menuProps: {
    PaperProps: {
      sx: {
        backgroundColor: 'inherit',
        color: '#9E94A5',
        fontSize: '12px',
        borderRadius: '8px',
        border: '1px solid #AC92FF',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#3E3A4B',
          },
          '&.Mui-selected': {
            backgroundColor: 'inherit',
          },
        },
      },
    },
  },
};

export default styles;
