const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 5,
    maxWidth: 1200,
  },
  bannerGridProps: {
    container: true,
    item: true,
    width: '100%',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[1],
      border: `1.63px solid ${theme.palette.Background.purple3}`,
      borderRadius: '12.22px',
      color: 'white',
      height: '169px',
      pl: 1,
    }),
  },
  containerGridProps: {
    container: true,
    direction: 'column',
    spacing: 2,
  },
  innerContainerGridProps: {
    item: true,
    container: true,
    alignItems: 'center',
    spacing: 2,
    justifyContent: 'space-between',
  },
  filtersGridProps: {
    item: true,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '29.44px',
  },
  subtitleProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14.72px',
    width: 450,
  },
  highlightTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: '#8653FF',
  },
  image1Props: {
    objectFit: 'cover',
    priority: true,
    width: 220,
    height: 169,
  },
  image2Props: {
    objectFit: 'cover',
    priority: true,
    width: 300,
    height: 169,
  },
  star1Props: {
    position: 'absolute',
    sx: {
      inset: '80px auto auto -5px',
      scale: '.6',
    },
  },
  star2Props: {
    position: 'absolute',
    sx: { inset: '-10px auto auto 180px', scale: '.3' },
  },
  star3Props: {
    position: 'absolute',
    sx: { inset: '90px 0px auto auto', scale: '.3' },
  },
  filtersProps: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tabsGrid: {
    display: 'flex',
    gap: '10px',
  },
  inputProps: (icon) => ({
    placeholder: 'Search Catalog',
    textTransform: 'none',
    size: 'small',
    InputProps: {
      startAdornment: icon,
    },
    sx: {
      width: '254px',
      '.MuiInputBase-root': {
        border: '1.63px solid #65417D',
        borderRadius: '20px',
        background: 'transparent',
        color: '#BDBDBD',
        justifyContent: 'center',
        padding: '0 10px',
        gap: '10px',
      },
      input: {
        fontFamily: 'Satoshi Bold',
        fontSize: '14px',
        padding: '0',
        height: '34px',
      },
      fieldset: {
        border: 'none',
      },
      svg: {
        color: '#6E6D73',
      },
    },
  }),
};

export default styles;
