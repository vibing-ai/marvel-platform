const styles = {
  mainGridProps: {
    item: true,
    xs: 12,
    sx: { marginBottom: '16px' },
  },
  textFieldProps: {
    sx: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '24px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '& fieldset': {
          borderColor: '#9d74ff',
        },
        '&:hover fieldset': {
          borderColor: '#9d74ff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#9d74ff',
        },
      },
    },
  },
};

export default styles;
