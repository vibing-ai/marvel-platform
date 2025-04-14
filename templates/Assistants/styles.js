const styles = {
  mainGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    height: 'auto',
    rowGap: 5,
    py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
    sx: {
      maxWidth: '1200px',
    },
  },
  headerGridProps: {
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  },
  backButtonGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  outlinedButtonProps: {
    color: 'purple',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      borderRadius: '8px',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 1, desktop: 2, desktopMedium: 3 },
      color: '#AC92FF !important',
      borderRadius: '6px',
    },
  },
  headerTextGridProps: {
    container: true,
    item: true,
    width: '100%',
  },
  headerTextProps: {
    fontFamily: 'Satoshi Bold',
    fontWeight: 500,
    fontSize: '36px',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontWeight: 400,
    fontSize: '20px',
    color: '#CBCBCB',
  },
  containerGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5,
    py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
    sx: {
      maxWidth: '1200px',
    },
  },
};

export default styles;
