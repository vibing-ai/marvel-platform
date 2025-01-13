const styles = {
  mainGridProps: (
    color,
    inverted,
    extraProps,
    disabled,
    loading,
    disableHover
  ) => ({
    container: true,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    borderRadius: "100px",
    padding: "1px",
    flex: 1,
    ...extraProps,
    sx: (theme) => ({
      background: () => {
        if (disabled || loading) return theme.palette.Greyscale[650];
        if (inverted) return "transparent";
        return theme.palette.Background.gradient[color];
      },
      ...(!disableHover && {
        "&:hover": {
          ...(inverted && {
            background: () => {
              if (disabled || loading) return theme.palette.Greyscale[650];
              return theme.palette.Background.gradient[color];
            },
          }),
        },
      }),
    }),
  }),
  buttonProps: (
    color,
    bgcolor,
    active,
    extraButtonProps,
    inverted,
    onHoverTextColor,
    disabled,
    loading,
    backgroundColor,
    textColor,
    disableHover
  ) => ({
    sx: (theme) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      borderRadius: "100px",
      columnGap: "10px",
      textTransform: "capitalize",
      background: backgroundColor,
      flex: 1,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      ...extraButtonProps,
      span: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(!inverted && {
          background:
            disabled || loading
              ? theme.palette.Greyscale[650]
              : theme.palette.Background.gradient[color],
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            active || disabled || loading ? "white" : "transparent",
        }),
        color: () => {
          if (disabled || loading) return theme.palette.Greyscale[400];
          if (inverted) return textColor || "black";
          return onHoverTextColor;
        },
        height: "100%",
        width: "auto",
        span: {
          WebkitTextFillColor: "white",
          marginRight: 1,
        },
      },
      "&:hover": {
        ...(!disableHover && {
          boxShadow: "none",
          ...(inverted && {
            background:
              disabled || loading ? theme.palette.Greyscale[650] : bgcolor,
          }),
          span: {
            ...(!inverted && {
              WebkitTextFillColor:
                onHoverTextColor || theme.palette.Common.White["100p"],
            }),
            ...(inverted && {
              background: theme.palette.Background.gradient[color],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: active ? "white" : "transparent",
            }),
          },
          svg: {
            color: !inverted
              ? onHoverTextColor
              : theme.palette.Background.gradient[color],
            path: {
              stroke: !inverted
                ? onHoverTextColor
                : theme.palette.Background.gradient[color],
            },
          },
        }),
        ...(disableHover && {
          backgroundColor,
          color: "inherit",
          cursor: "default",
        }),
      },
    }),
  }),
};

export default styles;
