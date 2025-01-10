const styles = {
  passwordGridProps: {
    position: 'relative',
    container: true,
    rowGap: 1,
    mb: 1,
  },
  passwordInputGridProps: {
    item: true,
    mobileSmall: 12,
  },
  forgotPasswordGridProps: {
    position: 'absolute',
    right: 0,
    bottom: (theme) => ({
      laptop: `-${theme.spacing(3)}`,
      desktop: `-${theme.spacing(4)}`,
      desktopMedium: `-${theme.spacing(5)}`,
    }),
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  forgotPasswordProps: {
    component: 'button',
    type: 'button',
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '12px', desktopMedium: '14px' },
    sx: {
      mr: 1,
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      color: (theme) => theme.palette.Greyscale[50],
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  submitButtonProps: {
    type: 'submit',
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
  googleSignInButtonProps: {
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
