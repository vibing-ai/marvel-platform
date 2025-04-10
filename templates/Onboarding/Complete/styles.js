const styles = {
  mainGrid: {
    maxWidth: '399px',
    py: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  titleProps: {
    variant: 'h4',
    gutterBottom: true,
    fontSize: '32px',
    fontFamily: 'Satoshi Bold',
    marginTop: '32px',
  },
  descriptionProps: {
    mb: 4,
    fontSize: '20px',
    fontWeight: '400',
    fontFamily: 'Satoshi Regular',
    alignItems: 'center',
  },
  buttonProps: {
    type: 'submit',
    variant: 'contained',
    sx: {
      width: '100%',
      height: '44px',
      backgroundColor: '#8653FF',
      borderRadius: '30px',
      padding: '10px, 155px, 10px, 155px',
      textTransform: 'none',
      fontSize: 20,
      color: '#fff',
      '&:hover': {
        backgroundColor: '#6e3aef',
      },
    },
  },
};

export default styles;
