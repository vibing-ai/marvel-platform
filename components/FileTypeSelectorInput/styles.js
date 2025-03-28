const styles = {
  labelGridProps: {
    container: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 4,
    ml: 0,
  },
  labelProps: (error) => ({
    color: (theme) => (error ? theme.palette.error.main : 'inherit'),
    fontSize: { laptop: '24px', desktop: '26px' },
    fontFamily: 'Satoshi Bold',
  }),
  inputGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    marginBottom: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioGroupGridProps: { // This is the new part for grid layout of options
    container: true,
    spacing: 2,
  },
  radioItemGridProps: { // This controls how the dropdown options are displayed
    item: true,
    xs: 6, // This makes each option take half the available width
  },
};

export default styles;