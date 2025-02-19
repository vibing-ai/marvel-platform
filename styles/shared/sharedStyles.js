const sharedStyles = {
  commonMainGridProps: {
    item: true,
    container: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: {
      desktopLarge: 5,
      desktop: 4,
      laptop: 5,
    },
    width: { laptop: '1450px' },
    maxWidth: { laptop: '1450px' },
    minWidth: {
      largeDesktop: '1536px',
      desktop: '1200px',
      laptop: '944px',
      tablet: '688px',
      mobileSmall: 0,
    },
  },
  submitButtonProps: {
    type: 'submit',
    variant: 'contained',
    size: 'large',
    sx: {
      borderRadius: '999px',
      textTransform: 'capitalize',
      fontSize: '16px',
      height: { laptop: '54px', desktopMedium: '60px' },
      mt: 1,
    },
  },
  formGridProps: {
    container: true,
    item: true,
    alignItems: 'center',
    flexDirection: 'column',
    mobileSmall: 12,
    rowGap: {
      desktopMedium: 6,
      laptop: 4,
    },
  },
  backButtonProps: {
    sx: {
      position: 'absolute',
      top: { laptop: '25px', desktop: '50px' },
      left: { laptop: '15px', desktop: '50px' },
    },
  },
};

export default sharedStyles;
