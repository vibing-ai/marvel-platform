const styles = {
  mainGridProps: {
    container: true,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: { laptop: 4, desktop: 6, desktopMedium: 6 },
    height: "100%",
  },
  formGridProps: {
    container: true,
    item: true,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 4,
    px: { laptop: 10, desktop: 12, desktopMedium: 14 },
    sx: {
      "& form": {
        width: "100%",
      },
    },
  },
  mainTitleProps: {
    fontFamily: "Ethnocentric Regular Italics",
    fontSize: { laptop: "48px", desktop: "56px", desktopMedium: "64px" },
    textTransform: "uppercase",
    lineHeight: "48px",
  },
  subTitleProps: {
    fontFamily: "Satoshi Bold",
    fontSize: { laptop: "16px", desktop: "20px", desktopMedium: "24px" },
    sx: (theme) => ({
      a: {
        textDecorationColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    }),
  },
  titleGridProps: {
    container: true,
    item: true,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    py: { mobileSmall: 2 },
    rowGap: {
      mobile: 2,
      mobileSmall: 1,
    },
    sx: (theme) => ({
      "& a": {
        textUnderlineOffset: "4px",
        textDecoration: "underline 2px",
        textDecorationColor: "#4255BD",
        color: "#4255BD",

        "&:active": {
          color: theme.palette.Greyscale[600],
          textDecorationColor: theme.palette.Greyscale[600],
        },
      },
      [theme.breakpoints.down("laptop")]: {
        marginBottom: theme.spacing(3),
      },
    }),
  },
  externalAuthButtonConfig: {
    variant: "contained",
    size: "large",
    startIcon: null,
    sx: (theme) => ({
      display: "flex",
      justifyContent: {
        mobileSmallPlus: "center",
        mobileSmall: "flex-end",
      },
      alignItems: "center",
      borderRadius: "999px",
      textTransform: "capitalize",
      fontSize: "14px",
      width: "100%",
      height: "50px",
      fontFamily: "Satoshi Bold",
      backgroundColor: theme.palette.Common.White["100p"],
      boxShadow: theme.customShadows.Elevation["2"].boxShadow,
      color: theme.palette.Greyscale[900],
      "&:hover": {
        backgroundColor: theme.palette.Common.White["30p"],
        boxShadow: theme.customShadows.Elevation["4"].boxShadow,
        color: theme.palette.Greyscale[900],
      },
      "& .MuiButton-startIcon": {
        position: "absolute",
        left: "24px",
      },
    }),
  },
  dividerConfig: {
    light: true,
    sx: (theme) => ({
      width: "100%",
      color: theme.palette.Greyscale[500],
      fontFamily: "Satoshi Bold",
      fontSize: "12px",
      "&:before,:after": { borderColor: "#E6E6E6", borderWidth: "2px" },
    }),
  },
  policyInfoGridConfig: {
    container: true,
    item: true,
    flexDirection: "column",
    alignItems: "center",
    sx: (theme) => ({
      borderTop: `1px solid ${theme.palette.Greyscale[100]}`,
      paddingTop: "14px",
      fontSize: "12px",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "10px",
      },
    }),
  },
  policyInfoTextConfig: {
    fontFamily: "Satoshi Medium",
    textAlign: "center",
    sx: (theme) => ({
      color: theme.palette.Greyscale[400],
      "a:link": {
        color: theme.palette.primary.main,
      },
      "a:active": {
        color: theme.palette.primary.dark,
      },
      fontSize: "inherit",
    }),
  },
  linksConfig: {
    fontFamily: "Satoshi Medium",
    textAlign: "center",
    sx: (theme) => ({
      color: theme.palette.Greyscale[400],

      "a:link": {
        color: theme.palette.Greyscale[600],
      },
      "a:visited": {
        color: theme.palette.Greyscale[600],
      },
      fontSize: "inherit",
    }),
  },
};

export default styles;
