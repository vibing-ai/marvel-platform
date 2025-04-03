const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    flexDirection: 'column',
    mobileSmall: 12,
    height: '100vh',
    maxHeight: '100vh',
    sx: (theme) => ({
      padding: '0px',
      background: theme.palette.Background.darkGradientBackground,
    }),
  },
  mainGrid: {
    position: 'relative',
    container: true,
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    color: 'white',
    overflow: 'hidden',
    sx: {
      background:
        'radial-gradient(circle at center -100px, #4A426A 0%, #201E2B 50%, #000000 100%)',
    },
  },
  navBarContainer: {
    position: 'fixed',
    justifyContent: 'center',
    width: '100vw !important',
    height: '80px',
    maxHeight: '100%',
    paddingTop: '8px',
    paddingRight: '24px',
    paddingBottom: '8px',
    paddingLeft: '24px',
    zIndex: 10,
    backgroundColor: 'transparent',
    sx: (theme) => ({
      inset: '0 auto auto auto',
      [theme.breakpoints.down('laptop')]: {
        display: 'none',
      },
    }),
  },
  contentGridProps: (extraContentProps) => ({
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '70px',
    sx: {
      position: 'relative',
      py: {
        desktopLarge: 5,
        desktop: 4,
        laptop: 5,
      },
      px: {
        desktopLarge: 5,
        desktop: 4,
        laptop: 5,
      },
      overflow: 'scroll',
      maxHeight: '100vh',
      ...extraContentProps,
    },
  }),
  bgGridProps: {
    position: 'fixed',
    overflow: 'hidden',
    inset: '0 auto auto auto',
    width: '753px',
    height: '395px',
    sx: {
      pointerEvents: 'none',
    },
  },
  bgProps: {
    layout: 'fill',
  },
  childrenWrapProps: {
    sx: {
      zIndex: 10,
      alignSelf: 'stretch',
    },
  },
  logoGridProps: {
    item: true,
    container: true,
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },

  accountDetailsGridProps: {
    item: true,
    container: true,
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: {
      desktopLarge: 2,
      mobile: 1,
      mobileSmall: '4px',
    },
  },
  intercomIconConfig: {
    width: 36,
    height: 36,
    alt: 'Intercom',
  },
  diamondProps: {
    color: 'blue',
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    extraChipGridProps: { minWidth: '90px' },
    extraChipProps: {
      px: { mobileSmall: 1, desktopMedium: '10px' },
    },
  },
  coinsProps: {
    color: 'yellow',
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    extraChipGridProps: { minWidth: '90px' },
    extraChipProps: {
      px: { mobileSmall: 1, desktopMedium: '10px' },
    },
  },
  faviconGridProps: {
    item: true,
    container: true,
    width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    justifyContent: 'flex-start',
    alignItems: 'center',
    sx: {
      svg: {
        width: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
        height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  backButtonGridProps: {
    item: true,
    container: true,
    mobileSmall: 4,
    columnGap: 1,
  },
  backButtonProps: {
    iconPlacement: 'left',
    color: 'blue2',
    bgcolor: '#181A20',
    extraProps: {
      fontSize: '14px',
      fontFamily: 'Satoshi Medium',
      height: { desktop: '48px', mobile: '36px', mobileSmall: '28px' },
    },
  },
  missionDashboardButtonProps: {
    bgcolor: '#181A20',
    color: 'purple',
    iconPlacement: 'left',
    extraProps: {
      width: '100%',
      height: '36px',
    },
    extraButtonProps: {
      fontSize: '18px',
      fontFamily: 'Satoshi Bold',
    },
  },
  missionDetailsButtonProps: {
    bgcolor: '#181A20',
    color: 'purple2',
    iconPlacement: 'left',
    extraProps: {
      width: '100%',
      height: '36px',
    },
    extraButtonProps: {
      fontSize: '18px',
      fontFamily: 'Satoshi Bold',
    },
  },
  startQuizButtonProps: {
    variant: 'mission',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      height: '36px',
      fontFamily: 'Satoshi Bold',
      fontSize: '18px',
    },
  },
  submitButtonProps: {
    variant: 'mission',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100px',
      textTransform: 'capitalize',
      height: '36px',
      fontFamily: 'Satoshi Bold',
      fontSize: '18px',
    },
  },
  backToMissionButtonProps: {
    sx: {
      borderColor: 'transparent',
      borderRadius: '100px',
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      textTransform: 'capitalize',
      color: (theme) => theme.palette.Background.gradient.grey,
      '&:hover': {
        background: (theme) => theme.palette.Background.gradient.grey,
        color: (theme) => theme.palette.Dark_Colors.Dark[1],
        svg: {
          color: (theme) => theme.palette.Dark_Colors.Dark[1],
        },
      },
    },
  },
};

export default styles;
