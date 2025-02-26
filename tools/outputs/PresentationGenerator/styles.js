const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 4,
    px: 6,
    py: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    sx: {
      background: '#0F0E14',
      border: '2px solid #1C1233',
      color: 'white',
    },
  },
  slidesGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 3,
  },
  slideGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 1,
    sx: {
      background: '#1C1233',
      borderRadius: '10px',
      padding: '16px',
    },
  },
  slideTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
    color: '#AC92FF', // Purple color for titles
  },
  slideContentProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px' },
    color: 'white', // White color for content
  },
};

export default styles;
