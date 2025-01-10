const styles = {
  submitButtonProps: {
    color: 'purple4',
    inverted: true,
    extraProps: {
      padding: '2px',
      marginBottom: '-15px',
      height: { laptop: '54px', desktopMedium: '60px' },
      width: '60%',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
  googleSignUpButtonProps: {
    type: 'submit',
    inverted: true,
    disableHover: true,
    extraProps: {
      padding: '2px',
      marginTop: '-15px',
      height: { laptop: '54px', desktopMedium: '60px' },
      width: '60%',
      border: '1px solid',
      borderColor: '#5614F3',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      px: 4,
    },
  },
};

export default styles;
