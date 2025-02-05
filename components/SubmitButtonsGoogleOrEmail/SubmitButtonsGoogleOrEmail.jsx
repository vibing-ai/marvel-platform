import { Box, Grid, Typography } from "@mui/material";
import GradientOutlinedButton from "../GradientOutlinedButton";
import GoogleLogo from "@/assets/svg/GoogleLogo";
import { useTheme } from "@emotion/react";
import styles from "./styles";

const SubmitButtonsGoogleOrEmail = (props) => {
  const { submitText, googleSubmitText, handleGoogleSubmit, signInLoading } =
    props;
  const theme = useTheme();

  return (
    <Grid {...styles.submitButtonPropsContainer}>
      <Grid {...styles.submitButtonPropsItem}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          text={submitText}
          textColor={theme.palette.Common.White["100p"]}
          loading={signInLoading}
          {...styles.submitButtonProps}
        />
      </Grid>
      <Grid {...styles.legendTypographyContainer}>
        <Box {...styles.legendTypographyBox}>
          <legend {...styles.legendStyle}>
            <Typography {...styles.typography}>Or</Typography>
          </legend>
        </Box>
      </Grid>
      <Grid {...styles.submitButtonPropsItem}>
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
};
export default SubmitButtonsGoogleOrEmail;
