const styles = {
  notificationsBadge: {
    size: 'large',
    overlap: 'circular',
    sx: {
      '& .MuiBadge-badge': {
        color: 'white',
        backgroundColor: '#9D74FF',
        fontFamily: 'Satoshi Regular',
        fontSize: '12.8px',
        marginTop: '3px',
      },
    },
  },
  notificationsIcon: {
    sx: {
      width: '1.3em',
      height: 'auto',
    },
  },
  notificationsBox: {
    sx: {
      minWidth: 447,
      minHeight: 100,
      position: 'fixed',
      top: 70,
      right: 50,
      borderRadius: '20px',
      backgroundColor: '#0C0B1799',
    },
  },
  notificationsMenuBorder: {
    variant: 'outlined',
    sx: {
      borderRadius: '20px',
      border: '0.5px solid #9D7BFF',
    },
  },
  notificationsTitleBar: {
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
  },
  notificationsTitle: {
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '24px',
    },
  },
};
export default styles;
