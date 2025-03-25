const styles = {
  mainGridProps: {
    container: true,
    item: true,
    xs: 12, // Replace mobileSmall with xs
    rowGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    px: 4,
  },
  slidesGridProps: {
    container: true,
    item: true,
    xs: 12, // Replace mobileSmall with xs
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 4,
  },
  slideGridProps: {
    container: true,
    item: true,
    gap: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: 4,
    py: 6,
    sx: {
      background: 'linear-gradient(145deg, #0F0E14, #1C1233)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      border: '2px solid #2C223F',
      borderRadius: '15px',
      color: 'white',
    },
  },
  slideLabelProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { xs: '16px', sm: '18px' }, // Replace laptop/desktop with xs/sm
    color: '#AC92FF',
    mb: 2, // Margin below label
    textAlign: 'center',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { xs: '18px', sm: '20px', md: '22px' }, // Replace mobileSmall/laptop/desktop with xs/sm/md
    textAlign: 'center',
    color: '#EAEAEA',
    mb: 2,
  },
  contentProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { xs: '16px', sm: '18px', md: '20px' }, // Replace mobileSmall/laptop/desktop with xs/sm/md
    textAlign: 'center',
    color: '#D6D6D6',
    lineHeight: '1.5',
    mb: 3,
  },
  suggestionsProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Replace mobileSmall/laptop/desktop with xs/sm/md
    color: '#9E9E9E',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  exportButtonGridProps: {
    container: true,
    item: true,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  exportButtonStyle: {
    backgroundColor: 'linear-gradient(135deg, #6C63FF, #5750FF)',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    textTransform: 'none',
    fontFamily: 'Satoshi Bold',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    ':hover': {
      backgroundColor: '#4E4AFF',
      transform: 'scale(1.05)',
      transition: 'all 0.3s ease',
    },
  },
};

export default styles;
