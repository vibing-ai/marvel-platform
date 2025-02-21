const styles = {
  logoGridProps: {
    container: true,
    item: true,
    columnGap: 1.5,
    display: 'flex',
    maxWidth: '235px',
    width: 'auto',
    maxHeight: '89px',
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      cursor: 'pointer',
    },
  },
  logoProps: {
    width: '70px',
    height: '70px',
  },
  mainGridProps: {
    container: true,
    item: true,
    display: 'flex',
    height: '100%',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bgcolor: 'rgba(24, 26, 32, 0.37)',
    borderRadius: '30px',
    paddingLeft: '8px',
  },
  logoutGridProps: {
    container: true,
    item: true,
    width: 'auto',
    px: { laptop: 0.5, desktop: 1.5, desktopMedium: 2 },
  },
};

export default styles;