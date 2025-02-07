const styles = {
  defaultPromptsGridContainer: {
    sx: {
      margin: '0px 0px 10px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '0px',
      gap: '16px',
    },
  },
  defaultPrompt: {
    sx: (theme) => ({
      color: '#9E94A5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '16px 24px',
      gap: '16px',
      background: '#181A20',
      boxShadow: '0px 4px 8.9px rgba(0, 0, 0, 0.25)',
      border: '2px solid rgba(172, 146, 255, 0.55)',
      borderRadius: '20px',
      cursor: 'pointer',
      flex: '1',
      alignSelf: 'stretch',
      transition: 'all 0.5s ease',
      transformOrigin: 'center center',
      wordWrap: 'break-word',
      [theme.breakpoints.down('laptop')]: {
        padding: '8px 16px',
      },
      '&:hover': {
        color: '#9E86FF',
        borderColor: '#9E86FF',
        transform: 'scale(1.05)',
      },
    }),
  },
  defaultPromptStarLogo: {
    sx: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: '0px',
      gap: '10px',
    },
  },
  promptText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '-0.02em',
    flex: 'none',
    order: '0',
    alignSelf: 'stretch',
    flexGrow: '0',
    sx: (theme) => ({
      [theme.breakpoints.down('laptop')]: {
        fontSize: '14px',
      },
    }),
  },
};

export default styles;
