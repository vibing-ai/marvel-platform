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
  presentationTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '24px', desktop: '28px' },
    color: '#AC92FF', // Purple color for the title
    alignSelf: 'flex-start', // Align the title to the left
    width: '100%',
    mb: 3, // Add margin bottom for spacing
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
  slideNumberProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
    color: '#AC92FF', // Purple color for slide numbers
  },
  slideTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
    color: '#AC92FF', // Purple color for titles
    sx: {
      width: '100%',
      marginBottom: '8px',
    },
  },
  slideContentProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px' },
    color: 'white', // White color for content
    sx: {
      width: '100%',
    },
  },
  generateButtonProps: {
    sx: {
      background: 'linear-gradient(90deg, #AC92FF 0%, #7F77FF 100%)',
      color: 'white',
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktop: '18px' },
      padding: '10px 20px',
      borderRadius: '10px',
      marginTop: '20px',
      textTransform: 'capitalize', // Ensure only the first letter is uppercase
      '&:hover': {
        background: 'linear-gradient(90deg, #7F77FF 0%, #AC92FF 100%)',
      },
    },
  },
  actionButtonGridProps: {
    container: true,
    justifyContent: 'flex-end', // Align the button to the bottom right
    mt: 4, // Add margin top for spacing
  },
};

export default styles;