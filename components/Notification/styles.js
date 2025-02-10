const styles = {
  notifIcon: {
    fontSize: 'large',
    'aria-label': 'readIcon',
    sx: {
      padding: '2px',
      borderRadius: '50%',
      border: '3px solid #9D7BFF',
      margin: '5px 15px 5px 5px',
      color: '#9D7BFF',
    },
  },
  notifTitle: {
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '18px',
    },
  },
  notifDate: {
    color: 'text.secondary',
    sx: {
      fontFamily: 'Satoshi Regular',
      fontSize: '16px',
      margin: '0px 5px 5px 0px',
    },
  },
  notifViewButton: {
    'aria-label': 'viewNotif',
    sx: {
      background: '#9D7BFF33',
      border: '0.5px solid #9D7BFF',
      borderRadius: '5px',
      marginRight: '20px',
      '&:hover': {
        background: '#9D7BFF',
      },
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
