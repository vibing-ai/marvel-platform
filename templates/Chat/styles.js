const styles = {
  chatInterface: {
    container: true,
    height: '100%',
    width: '100%',
    direction: 'row',
    alignItems: 'flex-end',
    sx: {
      flexWrap: 'nowrap',
      position: 'relative',
      paddingBottom: '90px',
      display: 'flex',
      gap: '20px',
    },
  },
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 5,
    maxWidth: 'calc(100% - 252px)',
    flex: 1,
  },
  moreChat: {
    moreChatProps: {
      container: true,
      bgcolor: '#FCFCFC',
      boxShadow: '0px 4px 15px rgba(202, 202, 202, 0.25)',
      borderRadius: '12px',
      flexDirection: 'column',
      alignContent: 'center',
      padding: '10px 10px',
      zIndex: 100,
    },
    contentMoreChatProps: {
      container: true,
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '15px 20px',
      borderRadius: '14px',
      sx: {
        ':hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    },
    titleProps: {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
      color: '#717171',
      sx: {
        marginLeft: '10px',
        marginRight: '30px',
      },
    },
    iconProps: {
      fontSize: '1.5rem !important',
      color: '#717171 !important',
    },
  },
  topChat: {
    topChatGridProps: {
      container: true,
      item: true,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      px: { mobileSmall: 2, desktopMedium: 3, desktopLarge: 4 },
      py: 1,
      height: '56px',
    },
    leftTopChatGridProps: {
      container: true,
      item: true,
      mobileSmall: 12,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    backToFriendProps: {
      color: '#6B6B6B',
    },
    avatarGridProps: {
      container: true,
      mobileSmall: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      item: true,
      padding: '2px',
      sx: {
        background: (theme) =>
          `linear-gradient(45deg, transparent, ${theme.palette.Background.green})`,
        borderRadius: '50%',
      },
    },
    outlinedButtonProps: {
      color: 'grey1',
      inverted: true,
      extraProps: {
        padding: '2px',
        height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      },
      extraButtonProps: {
        fontFamily: 'Satoshi Medium',
        fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
        px: { laptop: 3, desktop: 4, desktopMedium: 5 },
      },
    },
  },
  profileChat: {
    profileChatGridProps: {
      container: true,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      marginLeft: '10px',
      color: (theme) => theme.palette.Background.green,
    },
  },
  backFromSettings: {
    backFromSettingsGridProps: {
      container: true,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter',
      cursor: 'pointer',
    },
    titleProps: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#6B6B6B',
      marginLeft: '10px',
    },
  },
  centerChat: {
    centerChatGridProps: {
      position: 'relative',
      container: true,
      mobileSmall: true,
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 0,
      px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
      sx: {
        overflowY: 'auto',
      },
    },
    noMessagesGridProps: {
      container: true,
      desktopLarge: 12,
      justifyContent: 'center',
      height: '100%',
      alignContent: 'flex-start',
    },
    messagesGridProps: {
      container: true,
      item: true,
      mobileSmall: 12,
      px: '3px',
      pb: '3px',
      mt: 0.5,
      height: '100%',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      sx: {
        overflowY: 'auto',
      },
    },
    imageProps: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
    titleProps: {
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '23px',
      lineHeight: '45px',
      letterSpacing: '0.02em',
      color: '#646464',
      sx: {
        marginTop: '10px',
      },
    },
  },
  bottomChatContent: {
    bottomChatContentGridProps: {
      container: true,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      pt: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
      px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
    },
    bottomBarChatProps: {
      container: true,
      height: '100%',
      mobileSmall: 12,
      justifycontent: 'space-between',
      alignItems: 'center',
    },
    chatInputGridProps: (error) => ({
      position: 'fixed',
      container: true,
      mobileSmall: 12,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60px',
      padding: '2px',
      bottom: '20px',
      left: '20px',
      width: 'calc(100% - 292px)',
      sx: {
        fieldSet: {
          display: 'none',
        },
        background: (theme) =>
          error ? theme.palette.error.main : '#181A20',
        borderRadius: '30px',
        boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
      },
    }),
    chatInputProps: (renderQuicKAction, renderSendIcon, error) => ({
      type: 'text',
      placeholder: !error && 'Send a message',
      autoComplete: 'off',
      multiline: true,
      minRows: 1,
      maxRows: 10,
      sx: {
        width: '100%',
        position: 'relative',
        '& .MuiInputBase-root': {
          maxHeight: '250px',
          width: '100%',
          padding: '10px 16px',
          paddingLeft: renderQuicKAction ? '140px' : '16px',
          paddingRight: '60px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '100%',
          borderRadius: '30px',
        },
        '& .MuiInputBase-inputMultiline': { //added scrollbar when text exceed max height
          padding: '0',
          margin: '0',
          minHeight: '24px',
          maxHeight: '250px',
          lineHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          overflowY: 'auto !important',
          scrollbarWidth: 'thin',
          scrollbarColor: '#454545 #181A20',
          '&::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: '#181A20',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#454545',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#555555'
            }
          }
        },
      },
      InputProps: {
        notched: false,
        sx: () => ({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '8px',
          gap: '20px',
          bgcolor: '#181A20',
          borderRadius: '30px',
          color: '#9E94A5',
          pl: { laptop: '6px', desktop: '10px' },
          pr: { laptop: '8px', desktop: '10px' },
          minHeight: '50px',
          fontFamily: 'Satoshi Medium',
          fontSize: { laptop: '16px', desktop: '18px', desktopMedium: '20px' },
          whiteSpace: 'pre-wrap',
        }),
        endAdornment: renderSendIcon(),
        startAdornment: renderQuicKAction(),
      },
    }),
    sendIconProps: {
      style: {
        fill: (theme) => theme.palette.Dark_Colors.Dark[3],
        cursor: 'pointer !important',
      },
    },
    iconButtonProps: (disabled) => ({
      edge: 'end',
      'aria-label': 'toggle password visibility',
      sx: {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        width: { mobileSmall: 36, desktopMedium: 42 },
        height: { mobileSmall: 36, desktopMedium: 42 },
        mr: '2px',
        zIndex: 2,
        backgroundColor: 'transparent',
        path: {
          fill: (theme) =>
            disabled
              ? `${theme.palette.Greyscale[700]} !important`
              : `${theme.palette.Background.green} !important`,
        },
        ':hover': {
          background: (theme) =>
            disabled
              ? 'none !important'
              : `${theme.palette.Common.Black['30p']} !important`,
        },
      },
    }),
  },
  chatbotSpinnerGridProps: (show) => ({
    position: 'absolute',
    display: show ? 'flex' : 'none',
    height: '100%',
    columnGap: 2,
    width: 'fit-content',
    justifyContent: 'flex-start',
    alignItems: 'center',
    px: '15px',
    sx: {
      borderRadius: '14px',
    },
  }),
  chatIconGridProps: {
    item: true,
    mobileSmall: 'auto',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTextGridProps: (error) => ({
    item: true,
    mobileSmall: 'auto',
    sx: {
      background: error
        ? (theme) => theme.palette.Background.gradient.error
        : 'linear-gradient(85deg, #2845DC 0%, #BB43E6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  }),
  loadingTextProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: '14px',
  },
  loadingSpinnerGridProps: {
    item: true,
    mobileSmall: 'auto',
  },
  cancelIconProps: {
    sx: { width: '34px', height: '34px' },
  },
  avatarProps: {
    priority: true,
    width: 48,
    height: 48,
    style: { display: 'flex', borderRadius: '50%' },
    objectFit: 'fill',
  },
  avatarIconInputProps: {
    sx: {
      position: 'relative',
      marginRight: 2,
      height: 48,
      width: 48,
      maxHeight: 'none',
    },
  },
  newMessageButtonProps: {
    sx: (theme) => ({
      position: 'absolute',
      bottom: {
        laptop: theme.spacing(15),
        desktop: theme.spacing(17),
        desktopMedium: theme.spacing(18),
      },
      right: {
        laptop: theme.spacing(4),
        desktop: theme.spacing(6),
        desktopMedium: theme.spacing(8),
      },
      textTransform: 'capitalize',
      borderRadius: '50px',
      minWidth: '0px',
      color: 'white',
      border: '1px solid white',
      boxShadow: theme.customShadows.Elevation[4].boxShadow,
      background: theme.palette.primary.main,
      span: {
        marginRight: '0px',
        marginLeft: '0px',
      },
      ':hover': {
        boxShadow: 'none',
        color: 'white',
      },
    }),
  },

  quickActionButton: {
    sx: {
      position: 'absolute',
      bottom: '8px',
      left: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      background: '#AC92FF',
      borderRadius: '40px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '6px',
      zIndex: 2,
      minHeight: '36px',
      flex: 'none',
      order: '0',
      flexGrow: '0',
      '&:hover': {
        backgroundColor: 'rgb(88,20,244)',
      },
    },
  },
  quickActionButtonAddIcon: {
    sx: {
      border: '2px solid white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

export default styles;
