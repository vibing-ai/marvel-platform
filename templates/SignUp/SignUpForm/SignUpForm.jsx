import { useContext, useState } from 'react';

import { Grid, useTheme } from '@mui/material';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FormContainer } from 'react-hook-form-mui';

import AuthTextField from '@/components/AuthTextField';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import GoogleIcon from '@/assets/svg/googleIcon.svg';

import styles from './styles';

import sharedStyles from '@/styles/shared/sharedStyles';

import { AUTH_STEPS, VALIDATION_STATES } from '@/libs/constants/auth';
import ALERT_COLORS from '@/libs/constants/notification';
import useWatchFields from '@/libs/hooks/useWatchFields';
import { AuthContext } from '@/libs/providers/GlobalProvider';
import AUTH_REGEX from '@/libs/regex/auth';
import { signUp } from '@/libs/services/user/signUp';
import { validatePassword } from '@/libs/utils/AuthUtils';

import OrBlock from '@/templates/utils/OrBlock';

import GoogleSignInButton from '@/templates/SignIn/SignInForm/GoogleSignInButton';

const DEFAULT_FORM_VALUES = {
  email: '',
  fullName: '',
  password: '',
  reEnterPassword: '',
};

const DEFAULT_ERR_STATE = {
  email: false,
  fullName: false,
  password: false,
  reEnterPassword: false,
};

const WATCH_FIELDS = [
  {
    fieldName: 'password',
    regexPattern: AUTH_REGEX.password.regex,
  },
  {
    fieldName: 'reEnterPassword',
    regexPattern: AUTH_REGEX.password.regex,
  },
  {
    fieldName: 'email',
    regexPattern: AUTH_REGEX.email.regex,
  },
  {
    fieldName: 'fullName',
    regexPattern: AUTH_REGEX.fullName.regex,
  },
];

/**
 * Sign up form component that handles user registration.
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.step - The current step in the sign-up process.
 * @param {function} props.setStep - A function to update the current step.
 * @param {function} props.handleSwitch - A function to switch between sign-up and verify email view.
 * @return {JSX.Element} Returns Sign-Up Form.
 */
const SignUpForm = (props) => {
  const { step, setStep, setEmail, handleSwitch } = props;

  const theme = useTheme();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const { register, control, fieldStates } = useWatchFields(WATCH_FIELDS);
  const { email, fullName, password, reEnterPassword } = fieldStates;

  const passwordMatch = password.value === reEnterPassword.value;

  const setReEnterPasswordStatus = () => {
    if (passwordMatch && password.valid && reEnterPassword.valid) {
      return VALIDATION_STATES.SUCCESS;
    }

    if (password.value === '') return VALIDATION_STATES.DEFAULT;

    return VALIDATION_STATES.ERROR;
  };

  const submitButtonText = () => {
    if (step === AUTH_STEPS.EMAIL) {
      return 'Continue';
    }
    return 'Sign Up';
  };

  const handleSubmit = async () => {
    const isEmailStep = step === AUTH_STEPS.EMAIL;

    setError(DEFAULT_ERR_STATE);

    if (isEmailStep) {
      if (fullName.valid && email.valid) {
        setStep(AUTH_STEPS.PASSWORD);
        return;
      }

      if (!fullName.valid && !email.valid) {
        setError({
          ...error,
          fullName: { message: 'Full name is required' },
          email: { message: 'Email address is required' },
        });
        return;
      }

      if (!fullName.valid) {
        setError({
          ...error,
          fullName: { message: 'Full name is required' },
        });
        return;
      }

      if (!email.valid) {
        setError({
          ...error,
          email: { message: 'Email address is required' },
        });
        return;
      }
    }

    const isPasswordValid = validatePassword(
      { reEnterPassword: reEnterPassword.value, password: password.value },
      setError
    );

    if (isPasswordValid) {
      setLoading(true);

      try {
        await signUp(email.value, password.value, fullName.value);
        handleOpenSnackBar(
          ALERT_COLORS.SUCCESS,
          'Account created successfully'
        );

        setEmail(email.value);
        handleSwitch();
      } catch (err) {
        handleOpenSnackBar(ALERT_COLORS.ERROR, err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Uses v3 recaptcha to "invisibly" validate human or bot, allows callback FN to be executed if human 
  const verifyRecaptcha = async (callback) => {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('login');

    try {
      const res = await axios.post('/api/verify-recaptcha', { gRecaptchaToken: token });
      if (res.data?.success) callback();
      else handleOpenSnackBar('error', 'Failed reCAPTCHA verification');
    } catch (e) {
      console.error(e.message);
    }
  };

  const renderEmailInput = () => {
    if (step !== AUTH_STEPS.EMAIL) {
      return null;
    }

    return (
      <AuthTextField
        id="email"
        name="email"
        label="Email Address"
        placeholderText="Email address"
        error={!!error.email}
        helperText={
          !email.valid && email.value
            ? AUTH_REGEX.email.message
            : error.email?.message
        }
        state={email.status}
        control={control}
        ref={register}
        focused
      />
    );
  };

  const renderFullNameInput = () => {
    if (step !== AUTH_STEPS.EMAIL) {
      return null;
    }

    return (
      <AuthTextField
        id="fullName"
        name="fullName"
        label="Full Name"
        placeholderText="Full name"
        error={!!error.fullName}
        helperText={
          !fullName.valid && fullName.value
            ? AUTH_REGEX.fullName.message
            : error.fullName?.message
        }
        state={fullName.status}
        control={control}
        ref={register}
        focused
      />
    );
  };

  const renderPasswordAndConfirmPasswordInputs = () => {
    if (step === AUTH_STEPS.EMAIL) return null;

    return (
      <>
        <AuthTextField
          id="password"
          name="password"
          label="Password"
          placeholderText="Enter Password"
          error={!!error.password}
          helperText={
            !password.valid && !!password.value
              ? AUTH_REGEX.password.message
              : error.password?.message
          }
          state={password.status}
          control={control}
          ref={register}
          isPasswordField
          focused
        />
        <AuthTextField
          id="reEnterPassword"
          name="reEnterPassword"
          label="Re-Enter Password"
          placeholderText="Re-Enter Password"
          error={!!error.reEnterPassword}
          helperText={
            !passwordMatch && !!password.value
              ? 'Password does not match'
              : error.reEnterPassword?.message
          }
          state={setReEnterPasswordStatus()}
          control={control}
          ref={register}
          isPasswordField
          focused
        />
      </>
    );
  };

  const renderSubmitButton = () => {
    return (
      <GradientOutlinedButton
        clickHandler={() => verifyRecaptcha(handleSubmit)}
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        loading={step === AUTH_STEPS.PASSWORD && loading}
        textColor={theme.palette.Common.White['100p']}
        text={submitButtonText()}
        {...styles.submitButtonProps}
      />
    );
  };

  return (
    <FormContainer
      defaultValues={DEFAULT_FORM_VALUES}
      onSuccess={() => verifyRecaptcha(handleSubmit)}
    >
      <Grid {...sharedStyles.formGridProps}>
        {renderEmailInput()}
        {renderFullNameInput()}
        {renderPasswordAndConfirmPasswordInputs()}
        {renderSubmitButton()}
        <OrBlock />
        <GoogleSignInButton isSignIn={false} />
      </Grid>
    </FormContainer>
  );
};

export default SignUpForm;
