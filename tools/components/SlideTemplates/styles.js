const styles = {
    slideContainer: {
      width: '100%',
      aspectRatio: '16/9',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      margin: '20px 0',
      '@media (max-width: 768px)': {
        aspectRatio: '4/3',
        padding: '30px',
      },
    },
    titleSlideContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    title: {
      fontFamily: 'Satoshi Bold',
      fontSize: '44px',
      color: '#000',
      marginBottom: '24px',
      width: '100%',
      '@media (max-width: 768px)': {
        fontSize: '38px',
      },
    },
    subtitle: {
      fontFamily: 'Satoshi Regular',
      fontSize: '28px',
      color: '#555',
      marginBottom: '16px',
      width: '100%',
      '@media (max-width: 768px)': {
        fontSize: '24px',
      },
    },
    bodyText: {
      fontFamily: 'Satoshi Regular',
      fontSize: '22px',
      color: '#333',
      lineHeight: '1.6',
      '@media (max-width: 768px)': {
        fontSize: '18px',
      },
    },
    bulletList: {
      listStyleType: 'disc',
      paddingLeft: '40px',
      marginTop: '16px',
    },
    bulletItem: {
      fontFamily: 'Satoshi Regular',
      fontSize: '22px',
      color: '#333',
      marginBottom: '12px',
      lineHeight: '1.4',
      '@media (max-width: 768px)': {
        fontSize: '18px',
        marginBottom: '8px',
      },
    },
    columnContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '40px',
      width: '100%',
      flex: 1,
      '@media (max-width: 768px)': {
        gap: '20px',
      },
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    columnTitle: {
      fontFamily: 'Satoshi Bold',
      fontSize: '24px',
      color: '#333',
      marginBottom: '16px',
      '@media (max-width: 768px)': {
        fontSize: '20px',
      },
    },
    sectionHeader: {
      fontFamily: 'Satoshi Bold',
      fontSize: '54px',
      color: '#000',
      textAlign: 'center',
      marginBottom: '16px',
      '@media (max-width: 768px)': {
        fontSize: '44px',
      },
    },
    slideBranding: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      fontFamily: 'Satoshi Regular',
      fontSize: '14px',
      color: '#999',
    }
  };
  
  export default styles;
  