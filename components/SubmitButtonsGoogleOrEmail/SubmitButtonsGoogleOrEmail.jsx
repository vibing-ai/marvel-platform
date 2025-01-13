import { Box, Grid, Typography } from "@mui/material";
import GradientOutlinedButton from "../GradientOutlinedButton";
import GoogleLogo from "@/assets/svg/GoogleLogo";
import { useTheme } from "@emotion/react";
import styles from "./styles";

export default function SubmitButtonsGoogleOrEmail({
  submitText,
  googleSubmitText,
  handleGoogleSubmit,
  signInLoading,
}) {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        flex: 1,
        gap: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Grid
        item
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          text={submitText}
          textColor={theme.palette.Common.White["100p"]}
          loading={signInLoading}
          {...styles.submitButtonProps}
        />
      </Grid>
      <Grid item sx={{ width: "50%" }}>
        <Box
          component="fieldset"
          sx={{
            flex: 1,
            textAlign: "center",
            borderBottom: 0,
            borderLeft: 0,
            borderRight: 0,
            borderTopWidth: 2.75,
            borderTopRightRadius: 1,
            borderTopLeftRadius: 1,
            borderTopColor: "#837d8393",
          }}
        >
          <legend
            style={{
              paddingLeft: 6,
              paddingRight: 6,
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}
            >
              Or
            </Typography>
          </legend>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <GradientOutlinedButton
          icon={<GoogleLogo width="35px" height="50px" />}
          iconPlacement="left"
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          text={`${googleSubmitText} Via Google`}
          textColor={theme.palette.Common.White["100p"]}
          loading={signInLoading}
          clickHandler={handleGoogleSubmit}
          id="google-sign-in-selector"
          {...styles.submitButtonPropsGoogle}
        />
      </Grid>
    </Grid>
  );
}
