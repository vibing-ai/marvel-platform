import { useContext, useState } from "react";

import { Grid, Link } from "@mui/material";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";

import { FormContainer } from "react-hook-form-mui";
import { useDispatch } from "react-redux";

import AuthTextField from "@/components/AuthTextField";

import styles from "./styles";

import sharedStyles from "@/styles/shared/sharedStyles";

import { AUTH_ERROR_MESSAGES } from "@/libs/constants/auth";
import ALERT_COLORS from "@/libs/constants/notification";
import ROUTES from "@/libs/constants/routes";

import { AuthContext } from "@/libs/providers/GlobalProvider";
import { setLoading } from "@/libs/redux/slices/authSlice";
import { auth, firestore } from "@/libs/redux/store";
import fetchUserData from "@/libs/redux/thunks/user";

import AUTH_REGEX from "@/libs/regex/auth";
import { googleAuthProvider } from "@/libs/firebase/config";
import SubmitButtonsGoogleOrEmail from "@/components/SubmitButtonsGoogleOrEmail/SubmitButtonsGoogleOrEmail";
import ReCaptcha from "@/components/ReCaptcha/ReCaptcha";
import { CAPTCHA_ERR } from "@/libs/constants/captcha";
import { CookieCompliance } from "@/components/CookieCompliance/CookieCompliance";

const DEFAULT_FORM_VALUES = {
  email:
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "user@test.com"
      : "",
  password:
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "Test@123"
      : "",
};

const DEFAULT_ERR_STATE = {
  email: false,
  password: false,
};

/**
 * Renders a sign-in form with email and password inputs, and a submit button.
 *
 * @param {object} props - The props object containing the handleSwitch function.
 * @return {JSX.Element} The sign-in form component.
 */
const SignInForm = (props) => {
  const { handleSwitch } = props;

  const [signInLoading, setSignInLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [capVal, setCapVal] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleOpenSnackBar } = useContext(AuthContext);

  const handleCapVal = (val) => {
    setCapVal(val);
  };

  const capValEmpty = capVal === "";
  const capValExpired = capVal === "expired";

  const handleSubmit = async (data) => {
    if (capValEmpty) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, CAPTCHA_ERR.EMPTY);
      return;
    }
    if (capValExpired) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, CAPTCHA_ERR.EXPIRED);
      return;
    }
    try {
      const { email, password } = data;
      console.log(email, password);

      setError(DEFAULT_ERR_STATE);

      // Check for required fields
      if (!email && !password) {
        handleOpenSnackBar(ALERT_COLORS.ERROR, "Fill out all required fileds.");
        setError({
          email: { message: "Email address is required" },
          password: { message: "Password is required" },
        });
        return;
      }

      // Check for valid email
      if (!AUTH_REGEX.email.regex.test(email)) {
        setError({ email: { message: AUTH_REGEX.email.message } });
        return;
      }

      // Check if password is entered
      if (!password) {
        setError({ password: { message: "Password is required" } });
        return;
      }

      // Sign in user
      setSignInLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // If user is not verified, sign out user
      if (!userCred.user.emailVerified) {
        signOut(auth);
        handleOpenSnackBar(
          ALERT_COLORS.INFO,
          "Please check your inbox to verify your email"
        );
        return;
      }

      // If user is verified, redirect to home
      dispatch(setLoading(true));
      const userData = await dispatch(
        fetchUserData({ firestore, id: userCred.user.uid })
      ).unwrap();
      console.log(userData);
      if (userData?.needsBoarding) {
        router.replace(ROUTES.ONBOARDING);
      } else {
        router.replace(ROUTES.HOME);
      }
    } catch ({ code }) {
      console.error(code);

      setError({ password: { message: AUTH_ERROR_MESSAGES[code] } });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    if (capValEmpty) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, CAPTCHA_ERR.EMPTY);
      return;
    }
    if (capValExpired) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, CAPTCHA_ERR.EXPIRED);
      return;
    }
    setSignInLoading(true);
    try {
      const data = await signInWithPopup(auth, googleAuthProvider);
      console.log(data);

      if (data) {
        handleOpenSnackBar(ALERT_COLORS.SUCCESS, "Sign in successful");
      }

      const userData = await dispatch(
        fetchUserData({ firestore, id: data.user.uid })
      ).unwrap();

      // if (!userData) {
      //   signOut(auth);
      //   router.replace(ROUTES.SIGNIN);
      //   throw new Error(AUTH_ERROR_MESSAGES[AUTH_ERR_CODES.USER_NOT_FOUND]);
      // }

      console.log(userData);
      // if (userData?.needsBoarding) {
      //   router.replace(ROUTES.ONBOARDING);
      //   handleOpenSnackBar(
      //     ALERT_COLORS.INFO,
      //     "Transporting you to onboarding."
      //   );
      // } else {
      //   router.replace(ROUTES.HOME);
      // }
    } catch (error) {
      console.error(error);

      setSignInLoading(false);
      signOut(auth);
      router.replace(ROUTES.SIGNIN);
      handleOpenSnackBar(
        ALERT_COLORS.ERROR,
        "There was an error signing you in. Please try again later"
      );
    }
  };

  const renderEmailInput = () => {
    return (
      <AuthTextField
        id="email"
        label="Email Address"
        placeholderText="Email address"
        error={!!error.email}
        helperText={error.email?.message}
        state="text"
        defaultValue={DEFAULT_FORM_VALUES.email}
      />
    );
  };

  const renderPaswordInput = () => {
    return (
      <Grid {...styles.passwordGridProps}>
        <Grid {...styles.passwordInputGridProps}>
          <AuthTextField
            id="password"
            label="Password"
            placeholderText="Enter Password"
            error={!!error.password}
            helperText={error.password?.message}
            state="text"
            isPasswordField
            defaultValue={DEFAULT_FORM_VALUES.password}
          />
        </Grid>
        <Grid {...styles.forgotPasswordGridProps}>
          <Link onClick={handleSwitch} {...styles.forgotPasswordProps}>
            Forgot Password?
          </Link>
        </Grid>
      </Grid>
    );
  };

  const renderSubmitButtons = () => {
    return (
      <SubmitButtonsGoogleOrEmail
        submitText="Sign In"
        googleSubmitText="Sign In"
        handleGoogleSubmit={handleGoogleSubmit}
        signInLoading={signInLoading}
      />
    );
  };

  return (
    <FormContainer
      defaultValues={DEFAULT_FORM_VALUES}
      onSuccess={(data) => handleSubmit(data)}
    >
      <Grid {...sharedStyles.formGridProps}>
        {renderEmailInput()}
        {renderPaswordInput()}
        {renderSubmitButtons()}
        <ReCaptcha handleCapVal={handleCapVal} />
      </Grid>
      <CookieCompliance />
    </FormContainer>
  );
};

export default SignInForm;
