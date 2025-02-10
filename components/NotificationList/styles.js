const styles = {
  notificationFilterBackground: {
    sx: {
      display: 'flex',
      justifyContent: 'space-evenly',
      backgroundColor: 'rgba(157,116,255,0.2)',
      border: '0.5px solid #9D74FF',
    },
  },
  filterButton: {
    sx: {
      minWidth: '47%',
      borderRadius: '5px',
      padding: '12px 10px 12px 10px',
      margin: '5px',
      color: 'white',
    },
  },
  notificationListLimit: {
    sx: {
      maxHeight: '50vh',
      overflowY: 'scroll',
      margin: '3px',
    },
  },
  glowingButton: {
    sx: {
      background: '#9D7BFF33',
      border: '0.5px solid #9D7BFF',
      color: 'white',
      marginLeft: '20px',
    },
  },
  divider: {
    sx: {
      width: '100%',
      padding: '3px',
      margin: '10px 0px 10px 0px',
      borderColor: '#9D7BFF',
    },
  },
};

export default styles;
