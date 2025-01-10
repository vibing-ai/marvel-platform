import { useContext } from 'react';

import { useTheme } from '@mui/material';

import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from '@/templates/SignIn/SignInForm/styles';

import GoogleIcon from '@/assets/svg/googleIcon.svg';

import { AuthContext } from '@/libs/providers/GlobalProvider';

const GoogleSignInButton = ({ isSignIn }) => {
  const { handleOpenSnackBar, handleGoogleLogin } = useContext(AuthContext);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const theme = useTheme();

  const verifyRecaptcha = async (callback) => {
    if (!executeRecaptcha) return;
    try {
      const token = await executeRecaptcha('login');
      const res = await axios.post('/api/verify-recaptcha', { gRecaptchaToken: token });
      if (res.data?.success) callback();
      else handleOpenSnackBar('error', 'Failed reCAPTCHA verification.');
    } catch (err) {
      handleOpenSnackBar('error', err.message);
    }
  };

  return (
    <GradientOutlinedButton
      clickHandler={() => verifyRecaptcha(handleGoogleLogin)}
      icon={<GoogleIcon width={24} height={24} />}
      iconPlacement="left"
      text={`Sign ${isSignIn ? 'In' : 'Up'} Via Google`}
      textColor={theme.palette.Common.White['100p']}
      onHoverTextColor={theme.palette.common.white['100p']}
      {...styles.googleSignInButtonProps}
    />
  );
};

export default GoogleSignInButton;
