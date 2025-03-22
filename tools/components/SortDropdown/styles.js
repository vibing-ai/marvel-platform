const styles = {
  formControlProps: {
    variant: 'outlined',
    sx: {
      minWidth: 120,
      borderRadius: '16px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
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
  selectProps: {
    borderRadius: '16px',
  },
};

export default styles;
