const transition = 'all 0.2s ease-in';

const styles = {
  chatHistoryWindow: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minWidth: '232px',
      maxWidth: '232px',
      height: '60px',
      borderRadius: '50px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#181A20',
      zIndex: 10,
      transition,
      '&.expanded': {
        height: '400px',
        borderRadius: '10px',
      },
    },
  },
  chatHistoryHeader: (showHistory) => ({
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '19px 24px',
      gap: '12px',
      width: '100%',
      minHeight: '60px',
      background: showHistory ? '#0B0C0F' : '#181A20',
      borderRadius: showHistory ? '10px 10px 0px 0px' : '50px',
      transition,
      cursor: 'pointer',
    },
  }),
  chatHistoryHeaderTitleContainer: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '8px',
      flex: 'none',
      order: '0',
      flexGrow: '0',
    },
  },
  chatHistoryHeaderTitleText: {
    sx: {
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '19px',
      display: 'flex',
      alignItems: 'center',
      color: '#FFFFFF',
      flex: 'none',
      order: '1',
      flexGrow: '0',
    },
  },
  chatHistoryHeaderButton: (showHistory) => ({
    sx: {
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      transition,
      transform: showHistory ? 'rotate(180deg)' : 'rotate(0deg)',
    },
  }),
  chatHistoriesContainer: (showHistory) => ({
    sx: {
      display: showHistory ? 'block' : 'none',
      width: '100%',
      height: 'calc(100% - 60px)',
      overflowY: 'auto',
      transition,
      background: 'rgba(24, 26, 32, 0.37)',
      backdropFilter: 'blur(47px)',
      borderRadius: '0 0 10px 10px',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
      },
    },
  }),
};

export default styles;
