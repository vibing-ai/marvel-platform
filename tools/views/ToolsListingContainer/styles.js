const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 3,
  },
  containerGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: '1200px', // prevent shrinks horizontally
  },
  innerListGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columnSpacing: 3,
    rowSpacing: 5,
  },
  headerGridProps: {
    container: true,
    item: true,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    pb: 1.5,
    sx: {
      borderBottom: '2px solid #6E6D73',
    },
  },
  categoryTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    color: '#6E6D73',
  },
};

export default styles;
