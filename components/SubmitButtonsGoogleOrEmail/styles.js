const styles = {
  submitButtonPropsContainer: {
    container: true,
    sx: {
      flex: 1,
      gap: 1,
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      marginTop: "10px",
    },
  },
  submitButtonPropsItem: {
    item: true,
    sx: {
      flex: 1,
      width: "100%",
    },
  },
  legendTypographyContainer: {
    item: true,
    sx: { width: "50%" },
  },
  legendTypographyBox: {
    component: "fieldset",
    sx: {
      flex: 1,
      textAlign: "center",
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      borderTopWidth: 2.75,
      borderTopRightRadius: 1,
      borderTopLeftRadius: 1,
      borderTopColor: "#837d8393",
    },
  },
  legendStyle: {
    style: {
      paddingLeft: 6.5,
      paddingRight: 6.5,
    },
  },
  typography: {
    sx: {
      fontWeight: 600,
      fontSize: 16,
      textAlign: "center",
    },
  },
  submitButtonProps: {
    type: "submit",
    color: "purple4",
    inverted: true,
    extraProps: {
      padding: "2px",
      height: { laptop: "54px", desktopMedium: "60px" },
      width: { laptop: "70%", desktopMedium: "50%" },
      margin: "auto",
    },
    extraButtonProps: {
      fontFamily: "Satoshi Bold",
      fontSize: { laptop: "15px", desktopMedium: "16px" },
      px: 4,
    },
  },

  submitButtonPropsGoogle: {
    type: "button",
    color: "purple4",
    inverted: true,
    extraProps: {
      padding: "2px",
      height: { laptop: "54px", desktopMedium: "60px" },
      width: { laptop: "70%", desktopMedium: "50%" },
      margin: "auto",
    },
    extraButtonProps: {
      fontFamily: "Satoshi Bold",
      fontSize: { laptop: "14px", desktopMedium: "16px" },
      px: 4,
    },
  },
};

export default styles;
