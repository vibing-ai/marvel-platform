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
  fileTypeButton: {
    my: 0.5,
    textTransform: 'none',
    height: '48px',
    borderRadius: '8px',
    width: '100%',
    backgroundColor: '#23252A',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2F3136',
    },
    '&.selected': {
      backgroundColor: '#4A4D55',
    }
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    width: '100%',
    padding: '16px',
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
  }
};

export default styles;
