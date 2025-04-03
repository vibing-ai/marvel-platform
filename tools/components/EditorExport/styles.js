const styles = {
  outlinedButtonProps: {
    sx: {
      margin: 0,
      padding: '-2px 0 !important',
    },
  },
  menuProps: {
    PaperProps: {
      sx: {
        backgroundColor: '#0C0B17',
        color: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.3)',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#3E3A4B',
          },
          '&.Mui-selected': {
            backgroundColor: '#0C0B17',
          },
        },
      },
    },
  },
  menuItemProps: {
    sx: {
      color: '#FFFFFF',
      fontSize: '14px',
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: '#3E3A4B',
      },
    },
  },
};

export default styles;
