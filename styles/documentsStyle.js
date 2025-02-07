const documentsStyle = {
  mainGridProps: {
    container: true,
    desktopLarge: 12,
    px: 15,
    py: 5,
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[1],
    }),
  },
  mainCardProp: {
    raised: true,
    sx: (theme) => ({
      backgroundColor: theme.palette.Common.Black['100p'],
      borderRadius: '20px',
      width: '100%',
      padding: '48px',
      [theme.breakpoints.down('laptop')]: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '30px',
      },
    }),
  },
  textConfig: {
    component: 'div',
    lineHeight: 1.5,
    color: 'white',
  },
};

export default documentsStyle;
