import { getRandomBackgroundColor } from '@/libs/utils/MiscellaneousUtils';

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    desktopLarge: 3,
    laptop: 3,
  },
  cardProps: (isPublished) => ({
    elevation: 5,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative',
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: isPublished ? 'pointer' : 'default !important',
      transition: (theme) => theme.transitions.create('all'),
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
      },
    },
  }),
  imageProps: (backgroundImgURL) => ({
    width: '100%',
    height: '144px',
    justifyContent: 'end',
    sx: {
      flexShrink: 0,
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: 'cover',
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
    },
  }),
  toolDetailsGridProps: {
    display: 'position',
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: '18px',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: (theme) => theme.palette.Common.White['100p'],
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      width: 'calc(100% - 16px)',
    },
  },
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '12px',
    color: (theme) => theme.palette.Common.White['100p'],
    sx: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      height: '3em',
      overflow: 'hidden',
    },
  },
  labelProps: (isPublished) => ({
    size: 'small',
    variant: 'outlined',
    label: isPublished ? 'Build Now' : 'Coming Soon',
    sx: {
      borderColor: isPublished ? '#AC92FF' : '#9D74FF',
      background: isPublished ? '#AC92FF' : '',
      '.MuiChip-icon': {
        color: 'white',
        ml: '6px',
      },
    },
  }),
};

export default styles;
