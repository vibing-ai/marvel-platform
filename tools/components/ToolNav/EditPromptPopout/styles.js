const styles = {
  buttonStyles: (popoutOpen) => ({
    minWidth: '120px !important',
    height: '40px !important',
    padding: '8px 16px !important',
    borderRadius: '30px !important',
    border: popoutOpen ? 'none !important' : '1px solid #9D7BFF !important',
    backgroundColor: popoutOpen ? '#DECDFF !important' : 'black !important',
    color: popoutOpen ? 'black !important' : 'white !important',
    fontFamily: 'Satoshi, sans-serif !important',
    fontWeight: popoutOpen ? '600 !important' : '500 !important',
    fontSize: '16px !important',
    textTransform: 'none !important',
    boxShadow: popoutOpen ? '0 0 8px rgba(157, 123, 255, 0.6) !important' : '0 0 5px rgba(157, 123, 255, 0.4) !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important',
    gap: '8px !important',
    transition: 'all 0.2s ease-in-out !important',
    '&:hover': {
      borderColor: popoutOpen ? 'none !important' : '#b79dff !important',
      backgroundColor: popoutOpen ? '#DECDFF !important' : 'rgba(0, 0, 0, 0.9) !important',
    },
  }),
  
  iconStyles: (popoutOpen) => ({
    transform: 'scale(1.2)', 
    display: 'flex',
    color: popoutOpen ? 'black' : 'white'
  }),
  
  popoverStyles: {
    width: '400px',
    height: 'auto',
    background: '#0F0E14',
    border: '1px solid #9D74FF',
    borderRadius: '20px',
    padding: '20px',
  }
};

export default styles;
 