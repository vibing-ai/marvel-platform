const styles = {
    mainContainer: {
    height: "792.7px",
    width: "800px",
    borderRadius: "20px", // Corrected from 'radius'
    border: "2px solid #9D74FF", // Applied border color properly
    padding: "28px",
    gap: "36px",
    backgroundColor: "#0C0B17",
    
    },
    titleContainer: {
      fontSize:'28px',textAlign:'center'
    },
    subTitleContainer: {
      fontSize:'16px', color:'#B3B3B2',textAlign:'center'
    },
    titleText: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '22px', desktop: '26px' },
      color: '#FFFFFF',
    },
    outlineListContainer: {
      container: true,
      item: true,
      mobileSmall: 12,
      justifyContent: 'flex-start',
      alignItems: 'center',
      rowGap: 2,
    },
    outlineContainer: {
      height:'412px',
      width:'744px',
      radius:'12px',
      
    },
    outlineItem: {
      display: 'flex',
      padding: '8px',
      margin:'12px',
      alignItems: 'center',
      gap: '8px',
      alignSelf: 'stretch',
      borderRadius: '10px',
      background: '#1C1C1C',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    },
  };
  
  export default styles;
  