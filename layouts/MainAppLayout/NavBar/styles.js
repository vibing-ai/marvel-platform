const styles = {
  mainGrid: {
    sx: (theme) => ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 24px',
      gap: '12px',
      width: '100%',
      background: 'rgba(24, 26, 32, 0.37)',
      backdropFilter: 'blur(47px)',
      borderRadius: '10px',
      [theme.breakpoints.up('largeDesktop')]: {
        width: '100%',
        maxWidth: 'auto',
      },
      '@media (max-width: 800px)': {
        background: 'red',
      },
    }),
    md: {
      padding: '8px 24px',
      borderRadius: '10px',
    },
  },
  logoGridProps: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '12px',
    },
  },
  logoImage: {
    sx: {
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
  logoText: {
    sx: {
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '150%',
      display: 'flex',
      alignItems: 'center',
      color: '#FFFFFF',
    },
  },
  title: {
    fontFamily: 'Satoshi Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '19px',
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  profile: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '16px',
    },
  },
  userContainer: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '12px',
    },
  },
  userProfile: {
    sx: {
      width: '28px',
      height: '28px',
      background: 'white',
    },
  },
  userName: {
    sx: {
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '150%',
      display: 'flex',
      alignItems: 'center',
      color: '#9E94A5',
    },
  },
  navMenu: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '16px',
    },
  },
  navMenuItem: (isActive) => ({
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '8px 12px',
      gap: '12px',
      background: '#24272F',
      border: isActive ? '1px solid #9E86FF' : '1px solid transparent',
      borderRadius: '8px',
      color: isActive ? '#9E86FF' : '#9E94A5',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      path: {
        stroke: isActive ? '#9E86FF' : '#9E94A5',
      },
    },
  }),
  navMenuText: {
    sx: {
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '150%',
      display: 'flex',
      alignItems: 'center',
    },
  },
};

export default styles;
