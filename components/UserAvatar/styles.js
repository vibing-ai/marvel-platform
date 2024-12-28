const styles = {
  container: {
    container: true,
    item: true,
    columnGap: 2,
    height: '100%',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      cursor: 'pointer',
    },
    px: { laptop: 0.5, desktop: 1.5, desktopMedium: 2 },
  },
  userAvatarCircleContainer: {
    container: true,
    item: true,
    mobileSmall: 'auto',
    height: '100%',
    width: '100%',
  },
  name: {
    maxWidth: "150px", // Incrementamos el ancho máximo para permitir dos palabras completas
    width: "auto",
    height: "24px",
    fontFamily: "Satoshi Bold",
    fontSize: "16px",
    color: "#9E94A5",
    textAlign: "left",
    lineHeight: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis", // Aseguramos truncamiento con "..."
  },
  nameContainer: {
    position: "relative",
    container: true,
    item: true,
    mobileSmall: true,
    display: "flex",
    width: "auto",
    height: "19px",
    whiteSpace: "nowrap",
  },
  userAvatarCircle: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#9d74ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3px',
  },
};

export default styles;
