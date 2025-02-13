const styles = {
  mainGridProps: {
    container: true,
    item: true,
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: 'rgba(24, 26, 32, 0.37)',
    borderRadius: '30px',
    paddingLeft: '8px',
    sx: (theme) => ({
      [theme.breakpoints.up('largeDesktop')]: {
        width: '1600px',
      },
    }),
  },
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
  logoutGridProps: {
    container: true,
    item: true,
    width: 'auto',
    px: { laptop: 0.5, desktop: 1.5, desktopMedium: 2 },
  },
  logoutButtonProps: {
    variant: 'outlined',
    fullWidth: true,
    sx: {
      justifyContent: 'flex-start',
      borderRadius: '24px',
      borderColor: 'transparent',
      paddingTop: '6px',
      paddingRight: '7px',
      paddingBottom: '8px',
      paddingLeft: '12px',
      transition: (theme) => theme.transitions.create('all'),
      color: '#9E94A5',
      path: {
        fill: '#9E94A5',
        stroke: '#9E94A5',
      },
      ':hover': {
        color: '#9E94A5',
        borderColor: 'transparent',
        background: 'transparent',
        path: {
          fill: '#9E94A5',
          stroke: '#9E94A5',
        },
      },
    },
  },

  logOutOutlineProps: {
    sx: {
      background: '#24272F',
      borderRadius: '6px',
      maxWidth: '30px',
      maxHeight: '30px',
      height: '100%',
      width: '100%',
      paddingTop: '6px',
      paddingRight: '7px',
      paddingBottom: '6px',
      paddingLeft: '7px',
    },
  },

  logoImageGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    height: '100%',
    width: '100%',
  },
  profileImageGridProps: {
    container: true,
    item: true,
    columnGap: 2,
    height: '100%',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      cursor: 'pointer',
    },
    px: { laptop: 0.5, desktop: 1.5, desktopMedium: 2 },
  },

  profileNameProps: {
    maxWidth: '86px',
    width: 'auto',
    height: '24px',
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: '#9E94A5',
    textAlign: 'left',
    lineHeight: '16px',
  },

  titleGridProps: {
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: true,
    display: 'flex',
    width: 'auto',
    height: '19px',
    sx: (theme) => ({
      [theme.breakpoints.down('tablet')]: {
        display: 'none',
      },
    }),
  },
  titleProps: {
    fontFamily: 'Ethnocentric Regular',
    fontSize: '28px',
    color: 'white',
  },
  subtitleProps: {
    width: 'auto',
    height: 'auto',
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: '#9E94A5',
    textAlign: 'left',
    lineHeight: '14px',
  },
};

export default styles;
