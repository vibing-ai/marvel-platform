import { useContext, useState } from 'react';

import { Grid, useTheme } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { FormContainer } from 'react-hook-form-mui';
import { useDispatch } from 'react-redux';

import { signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import AuthTextField from '@/components/AuthTextField';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import sharedStyles from '@/styles/shared/sharedStyles';

import { AUTH_STEPS, VALIDATION_STATES } from '@/libs/constants/auth';
import ALERT_COLORS from '@/libs/constants/notification';
import ROUTES from '@/libs/constants/routes';
import useWatchFields from '@/libs/hooks/useWatchFields';
import { AuthContext } from '@/libs/providers/GlobalProvider';
import { auth, googleAuthProvider, firestore } from '@/libs/redux/store';
import fetchUserData from '@/libs/redux/thunks/user';
import AUTH_REGEX from '@/libs/regex/auth';
import { signUp, signUpWithGoogle } from '@/libs/services/user/signUp';
import { validatePassword } from '@/libs/utils/AuthUtils';


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

  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();

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
        handleOpenSnackBar(ALERT_COLORS.ERROR, err.message || 'Unable to sign up');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, googleAuthProvider);
      const userData = await dispatch(
        fetchUserData({ firestore, id: userCred.user.uid })
      ).unwrap();

      // If user doesn't exist, create them
      if (!userData) {
        await signUpWithGoogle(userCred.user);
        // Fetch the newly created user data
        handleOpenSnackBar(
          ALERT_COLORS.SUCCESS,
          'Account created successfully with Google'
        );
      }

      router.replace(ROUTES.HOME); //if onboarding is required, useRedirect.jsx will redirect to onboarding
    } catch (err) {
      await signOut(auth); //in case error occurs after successful sign in with Popup, user must be signed out
      handleOpenSnackBar(
        ALERT_COLORS.ERROR,
        AUTH_ERROR_MESSAGES[code] || 'Unable to sign up with Google'
      );
    } finally {
      setLoading(false);
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
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        loading={step === AUTH_STEPS.PASSWORD && loading}
        textColor={theme.palette.Common.White['100p']}
        clickHandler={handleSubmit}
        text={submitButtonText()}
        {...styles.submitButtonProps}
      />
    );
  };

  const renderGoogleButton = () => {
    return (
        <GradientOutlinedButton
          bgcolor={theme.palette.Dark_Colors.Dark[1]}
          loading={loading}
          textColor={theme.palette.Common.White['100p']}
          clickHandler={handleGoogleSignUp}
          text="Sign up with Google"
          startIcon={<GoogleIcon />}
          {...styles.submitButtonProps}
        />
    );
  };

  return (
    <FormContainer defaultValues={DEFAULT_FORM_VALUES} onSuccess={handleSubmit}>
      <Grid {...sharedStyles.formGridProps}>
        {renderEmailInput()}
        {renderFullNameInput()}
        {renderPasswordAndConfirmPasswordInputs()}
        {renderSubmitButton()}
        {renderGoogleButton()}
      </Grid>
    </FormContainer>
  );
};

export default SignUpForm;
