const styles = {
  outerGridProps: {
    container: true,
    spacing: 2,
    sx: { padding: '16px 0' },
    wrap: 'nowrap',
  },
  innerGridProps: {
    item: true,
    xs: true,
  },
  boxProps: (isActive) => ({
    component: 'button',
    sx: {
      width: '100%',
      padding: '8px 16px',
      borderRadius: '16px',
      border: '2px solid #9d74ff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
      backgroundColor: isActive ? '#9d74ff' : 'transparent',
      color: isActive ? '#fff' : 'text.primary',
      '&:hover': {
        backgroundColor: isActive ? 'primary.dark' : 'action.hover',
      },
    },
  }),
};

export default styles;
