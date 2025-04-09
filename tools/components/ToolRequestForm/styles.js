const styles = {
  formProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    mobileSmall: 12,
    rowSpacing: 3,
  },
  mainContentGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowSpacing: 3,
    mt: 1,
  },
  titleGridProps: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleName: {
    color: (theme) => theme.palette.Common.White['100p'],
    fontFamily: 'Ethnocentric Regular Italics',
    fontSize: { laptop: '40px', desktop: '44px', desktopMedium: '48px' },
    width: '100%',
  },
  inputGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    marginBottom: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelGridProps: {
    container: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 1,
  },
  textFieldLabelGridProps: {
    container: true,
    mobileSmall: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 4,
  },
  labelProps: (error) => ({
    color: (theme) => (error ? theme.palette.error.main : 'inherit'),
    fontSize: { laptop: '24px', desktop: '26px' },
    fontFamily: 'Satoshi Bold',
  }),
  actionButtonGridProps: {
    alignSelf: 'end',
  },
  regenerateButtonGridProps: {
    alignSelf: 'middle',
  },
  submitButtonProps: {
    color: 'purple',
    extraProps: {
      padding: '2px',
      height: { laptop: '42px', desktop: '44px', desktopMedium: '47px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 5, desktop: 6, desktopMedium: 7 },
    },
  },
};

export default styles;
