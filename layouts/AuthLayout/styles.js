const styles = {
  mainGridProps: {
    container: true,
    justifyContent: "center",
    alignItems: "center",
    mobileSmall: 12,
    height: "100vh",
    px: { laptop: 6, desktop: 8, desktopMedium: 18 },
    py: { laptop: 3, desktop: 5, desktopMedium: 12 },
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[1],
    }),
  },
  imageProps: {
    layout: "fill",
    objectFit: "cover",
    priority: true,
    style: { zIndex: 0 },
  },
  marvelImageProps: {
    layout: "fill",
    objectFit: "cover",
    priority: true,
  },
  blobImageProps: {
    layout: "fill",
    objectFit: "cover",
    priority: true,
    alt: "green_blob",
    style: { zIndex: 0 },
  },
  mainCardProps: {
    raised: true,
    sx: (theme) => ({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: theme.palette.Dark_Colors.Dark[1],
      backgroundImage: "none",
      borderRadius: "20px",
      width: "100%",
      minHeight: { laptop: 760, desktop: 780, desktopMedium: 900 },
      height: "100%",
      zIndex: 1,
    }),
  },
  innerCardGridProps: {
    position: "relative",
    container: true,
    item: true,
    mobileSmall: 7,
    height: "100%",
    sx: {
      input: (theme) => ({
        "&:-internal-autofill-selected": {
          backgroundColor: "rgb(255, 255, 255) !important",
          backgroundImage: "none !important",
        },
        "&:-webkit-autofill": {
          WebkitBoxShadow: "none",
          WebkitTextFillColor: theme.palette.Common.Black["100p"],
          transition: "background-color 5000s ease-in-out 0s",
        },
      }),
    },
  },
  starProps: {
    sx: (theme) => ({
      position: "absolute",
      left: {
        laptop: theme.spacing(12),
        desktop: theme.spacing(10),
        desktopMedium: theme.spacing(5),
      },
      top: {
        laptop: theme.spacing(6),
        desktop: theme.spacing(8),
        desktopMedium: theme.spacing(10),
      },
      width: {
        laptop: 68,
        desktop: 76,
        desktopMedium: 83,
      },
    }),
  },
  star2Props: {
    sx: (theme) => ({
      position: "absolute",
      right: theme.spacing(14),
      top: theme.spacing(25),
      width: {
        laptop: 46,
        desktop: 50,
        desktopMedium: 56,
      },
    }),
  },
  marvelProps: {
    sx: (theme) => ({
      position: "absolute",
      zIndex: 2,
      left: 0,
      width: { laptop: 320, desktop: 360, desktopMedium: 420 },
      height: { laptop: 500, desktop: 560, desktopMedium: 650 },
      bottom: theme.spacing(5),
    }),
  },
  greenBlobProps: {
    sx: {
      position: "absolute",
      zIndex: 2,
      right: { laptop: 28, desktop: 44, desktopMedium: 80 },
      top: 0,
      width: { laptop: 420, desktop: 460, desktopMedium: 500 },
      height: { laptop: 290, desktop: 300, desktopMedium: 324 },
    },
  },
};

export default styles;
