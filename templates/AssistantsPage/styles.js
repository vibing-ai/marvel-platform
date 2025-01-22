const styles = {
  mainGridProps: {
    container: true,
    direction: 'column',
    gap: 4,
  },
  bannerGridProps: {
    container: true,
    sx: {
      position: 'relative',
      backgroundColor: 'primary.dark',
      borderRadius: 2,
      p: 4,
      overflow: 'hidden',
    },
  },
  image1Props: {
    style: {
      position: 'absolute',
      left: 40,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 200,
      height: 200,
      objectFit: 'contain',
    },
  },
  image2Props: {
    style: {
      position: 'absolute',
      right: 40,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 200,
      height: 200,
      objectFit: 'contain',
    },
  },
  star1Props: {
    sx: {
      position: 'absolute',
      left: '25%',
      top: '20%',
      transform: 'rotate(-15deg)',
    },
  },
  star2Props: {
    sx: {
      position: 'absolute',
      left: '35%',
      top: '60%',
      transform: 'rotate(15deg)',
    },
  },
  star3Props: {
    sx: {
      position: 'absolute',
      right: '30%',
      top: '30%',
      transform: 'rotate(30deg)',
    },
  },
  titleProps: {
    variant: 'h4',
    color: 'white',
    textAlign: 'center',
    fontWeight: 600,
    mb: 1,
  },
  subtitleProps: {
    variant: 'body1',
    color: 'white',
    textAlign: 'center',
    maxWidth: 600,
    mx: 'auto',
  },
  filtersProps: {
    container: true,
    justifyContent: 'center',
    gap: 2,
  },
  tabsGrid: {
    container: true,
    gap: 2,
    justifyContent: 'center',
  },
  headerGridProps: {
    container: true,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTitleProps: {
    variant: 'h6',
    fontWeight: 600,
  },
  containerGridProps: {
    container: true,
  },
  innerListGridProps: {
    container: true,
    spacing: 3,
  },
  cardItemProps: {
    xs: 12,
    sm: 6,
    md: 4,
  },
  cardGridProps: {
    sx: {
      backgroundColor: 'background.dark',
      border: '1px solid',
      borderColor: 'primary.dark',
      borderRadius: 3,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      position: 'relative',
    },
  },
  iconContainer: {
    sx: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      overflow: 'hidden',
      backgroundColor: 'primary.dark',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  nameProps: {
    variant: 'h6',
    sx: {
      color: 'common.white',
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  tagContainer: {
    sx: {
      position: 'absolute',
      top: 70,
      left: 24,
      backgroundColor: 'primary.main',
      borderRadius: 1,
      px: 1.5,
      py: 0.5,
    },
  },
  tagProps: {
    variant: 'caption',
    sx: {
      color: 'common.white',
      fontWeight: 500,
    },
  },
  descriptionProps: {
    variant: 'body2',
    sx: {
      color: 'common.white',
      opacity: 0.8,
      fontStyle: 'italic',
      mt: 1,
      mb: 2,
    },
  },
  ratingProps: {
    variant: 'body1',
    sx: {
      color: 'common.white',
      fontWeight: 600,
    },
  },
  ratingMaxProps: {
    variant: 'body2',
    sx: {
      color: 'common.white',
      opacity: 0.6,
    },
  },
  chatButtonProps: {
    sx: {
      backgroundColor: 'primary.dark',
      color: 'common.white',
      '&:hover': {
        backgroundColor: 'primary.main',
      },
      textTransform: 'none',
      px: 2,
    },
  },
  imageContainer: {
    sx: {
      position: 'relative',
      mb: 2,
      width: 80,
      height: 80,
    },
  },
  popularBadge: {
    sx: {
      position: 'absolute',
      top: -10,
      right: -20,
      backgroundColor: 'primary.main',
      color: 'white',
      px: 1,
      py: 0.5,
      borderRadius: 1,
      transform: 'rotate(20deg)',
    },
  },
  groupProps: {
    variant: 'body2',
    color: 'text.secondary',
    textAlign: 'center',
    mb: 1,
  },
};

export default styles;
