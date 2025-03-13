export const styles = {
  app: {
    background: `radial-gradient(
      97.95% 97.95% at 50% 1.11%,
      rgba(74, 66, 106, 0.95) 0%,
      rgba(32, 30, 43, 0.98) 38.41%,
      rgba(0, 0, 0, 1) 100%
    )`,
    minHeight: '100vh',
    width: '100%',
  },
  content: {
    display: 'flex',
    gap: '48px',
    padding: '0 40px',
    '@media (max-width: 991px)': {
      flexDirection: 'column',
    },
  },
  topBar: {
    container: {
      display: 'flex',
      padding: '24px 40px',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '112px',
      '@media (max-width: 640px)': {
        padding: '16px',
      },
    },
    toolName: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
    },
    menu: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    },
    header: {
      display: 'block',
      '@media (max-width: 640px)': {
        display: 'none',
      },
    },
    title: {
      color: '#fff',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '24px',
      fontWeight: '700',
      letterSpacing: '-0.48px',
      margin: '0',
    },
    tools: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    notifications: {
      width: '48px',
      height: '48px',
      position: 'relative',
    },
    notificationCount: {
      position: 'absolute',
      top: '0',
      right: '-4px',
      borderRadius: '24px',
      padding: '0 4px',
      minWidth: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9D74FF',
    },
    count: {
      color: '#fff',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '12px',
      fontWeight: '500',
    },
    profilePhoto: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    user: {
      profile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
      },
      userContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
      userProfile: {
        width: '48px',
        height: '48px',
        backgroundColor: 'white',
      },
      userName: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Satoshi, sans-serif',
      },
      logoutButton: {
        minWidth: '40px',
        padding: '8px',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
  navItem: {
    container: {
      display: 'flex',
      padding: '8px',
      alignItems: 'center',
      gap: '8px',
      borderRadius: '10px',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
      color: '#fff',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      backgroundColor: '#1C1C1C',
    },
    active: {
      backgroundColor: '#1C1C1C',
    },
    number: {
      fontWeight: '900',
    },
    text: {
      fontWeight: '400',
    },
  },
  sidebar: {
    container: {
      width: '232px',
      padding: '12px',
      borderRadius: '10px',
      backgroundColor: '#121212',
      '@media (max-width: 991px)': {
        width: '100%',
        marginBottom: '24px',
      },
    },
    navItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
  },
  slides: {
    container: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
      '@media (max-width: 991px)': {
        padding: '0',
      },
      '@media (max-width: 640px)': {
        gap: '32px',
      },
    },
  },
  slide: {
    container: {
      borderRadius: '10px',
      height: '608px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      backgroundColor: '#fff',
      marginBottom: '32px',
      '@media (max-width: 991px)': {
        height: 'auto',
        minHeight: '608px',
      },
    },
    content: {
      padding: '73px 101px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '@media (max-width: 640px)': {
        padding: '24px',
      },
    },
    title: {
      color: '#0F0535',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '42px',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '32px',
    },
    subtitle: {
      color: '#0F0535',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      lineHeight: '1.3',
      marginBottom: '32px',
      opacity: '0.85',
    },
    body: {
      color: '#0F0535',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    bulletList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    bulletItem: {
      color: '#0F0535',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '18px',
      lineHeight: '1.6',
      padding: '8px 0 8px 24px',
      position: 'relative',
      listStyleType: 'disc',
      '&::before': {
        content: "''",
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#9D74FF',
      },
    },
    // Enhanced image styles
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
      marginBottom: '20px',
      overflow: 'hidden',
      borderRadius: '8px',
      boxShadow: '0 4px 24px rgba(15, 5, 53, 0.1)',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '6px',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    },
    stretchImage: {
      width: '100%',
      objectFit: 'cover',
      borderRadius: '6px',
      boxShadow: '0 4px 24px rgba(15, 5, 53, 0.1)',
      margin: '20px 0',
    },
    caption: {
      fontSize: '16px',
      fontStyle: 'italic',
      textAlign: 'center',
      color: '#0F0535',
      opacity: '0.75',
      marginTop: '8px',
      marginBottom: '16px',
      fontFamily: 'Satoshi, sans-serif',
    },
    // Flex layouts for image slides
    flexContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '30px',
      flex: '1',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    textColumn: {
      flex: '1',
      minWidth: '0',
    },
    imageColumn: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '0',
    },
    contentImage: {
      maxWidth: '100%',
      maxHeight: '350px',
      objectFit: 'contain',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(15, 5, 53, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: '0 8px 32px rgba(15, 5, 53, 0.2)',
      },
    },
    // Three column layout
    threeColumnContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '20px',
      flex: '1',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    column: {
      flex: '1',
      minWidth: '0',
    },
    columnTitle: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '15px',
      textAlign: 'left',
      color: '#0F0535',
      fontFamily: 'Satoshi, sans-serif',
    },
    // Frame styling for images
    framedImage: {
      border: '8px solid white',
      boxShadow: '0 4px 20px rgba(15, 5, 53, 0.2)',
      borderRadius: '4px',
    },
  },
};
