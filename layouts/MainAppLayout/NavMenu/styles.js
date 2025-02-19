const styles = {
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    px: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
  },
  menuItemProps: (isActive) => ({
    sx: {
      py: 0,
      maxWidth: '165px',
      maxHeight: '40px',
      width: 'auto',
      height: '100%',
      borderRadius: '8px',
      background: '#24272F',
      m: 1,
      '@media (max-width: 800px)': {
        width: '20px',
      },
      border: isActive ? '1px solid #9D74FF' : '1px solid transparent',
      color: (theme) =>
        isActive ? `${theme.palette.Background.purple}95` : '#9E94A5',
      path: {
        stroke: (theme) =>
          isActive ? `${theme.palette.Background.purple}95` : '#9E94A5',
      },
      transition: (theme) => theme.transitions.create('all'),
      ':hover': {
        color: '#9E94A5',
        background: (theme) => `${theme.palette.Background.purple}30`,
        path: {
          stroke: '#9E94A5',
        },
      },
    },
  }),
  innerMenuGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    columnGap: 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '8px',
    paddingRight: '12px',
    paddingBottom: '8px',
    paddingLeft: '12px',
    sx: {
      inset: '0 auto auto auto',
    },
  },
  menuIconGridProps: {
    container: true,
    item: true,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 'auto',
    width: '100%',
    sx: {
      '@media (max-width: 1080px)': {
        transform: 'translateX(-24px)',
      },
      '@media (min-width: 800px)': {
        transform: 'translateX(0)',
      },
      '@media (max-width: 800px)': {
        transform: 'translateX(-24px)',
      },
      svg: {
        transform: { mobileSmall: 'scale(0.8)', desktop: 'scale(1)' },
      },
    },
  },
  menuTitleGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '71px',
    width: 'auto',
    maxHeight: '24px',
    height: 'auto',
    fontSize: { mobileSmall: '16px', desktop: '16px' },
    sx: {
      '@media (max-width: 1080px)': {
        display: 'none',
      },
    },
  },
};

export default styles;
