const styles = {
  buttonProps: {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, color 0.2s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
  iconProps: (isFavorite) => ({
    sx: {
      color: isFavorite ? '#9d74ff' : '#cccccc',
      fontSize: '24px',
      transition: 'color 0.2s ease',
    },
  }),
};

export default styles;
