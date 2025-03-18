import { useEffect } from 'react';

import { applyActionCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { AUTH_MODES } from '@/libs/constants/auth';
import ALERT_COLORS from '@/libs/constants/notification';
import ROUTES from '@/libs/constants/routes';

import {
  setLoading as setAuthLoading,
  setEmailVerified,
} from '@/libs/redux/slices/authSlice';
import { setLoading as setUserLoading } from '@/libs/redux/slices/userSlice';
import { auth } from '@/libs/redux/store';
import fetchUserData from '@/libs/redux/thunks/user';
import { homeRegex, onboardingRegex } from '@/libs/regex/routes';
import { fetchToolHistory } from '@/tools/data';

const redirectRegex = /\/redirect.*/;

const useRedirect = (firestore, functions, handleOpenSnackBar) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { route, asPath, query } = router;
  const { data: authData, loading } = useSelector((state) => state.auth);
  const { data: userData } = useSelector((state) => state.user);
  const fetchUserRelatedData = async (id) => {
    dispatch(fetchUserData({ firestore, id }));
    dispatch(fetchToolHistory());
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the current route is an authentication route
    const isAuthUrl = [
      ROUTES.SIGNIN,
      ROUTES.SIGNUP,
      ROUTES.PRIVACY,
      ROUTES.TERMS,
      ROUTES.PASSWORD_RESET,
    ].includes(route);

    const isRedirectRoute = redirectRegex.test(asPath);
    const isAuthRoute = isAuthUrl || isRedirectRoute;
    // If a authUser is authed, set the currentUser in the store
    if (auth.currentUser) {
      if (isRedirectRoute) {
        dispatch(setAuthLoading(false));
        return;
      }

      // If email is not verified, redirect to sign in
      if (!auth.currentUser.emailVerified) {
        if (!isAuthUrl) {
          router.push(ROUTES.SIGNIN);
          return;
        }
        return;
      }

      fetchUserRelatedData(auth.currentUser.uid);

      if (route === ROUTES.CREATE_AVATAR || route === ROUTES.PASSWORD_RESET) {
        return;
      }

      if (isAuthUrl) {
        router.push(ROUTES.HOME);
        return;
      }
      return;
    }

    if (!isAuthRoute && !loading) router.push(ROUTES.SIGNIN);
  }, [authData]);

  useEffect(() => {
    // User is on an onboarding page but we want to redirect them to homepage
    if (auth.currentUser) {
      const isOnboardingUrl = onboardingRegex.test(asPath);

      // If users are on the onboarding page, redirect them to home
      if (isOnboardingUrl) {
        dispatch(setUserLoading(true));
        router.push(ROUTES.HOME);
        return;
      }

      // Set loading to false for any other pages
      dispatch(setUserLoading(false));
    }
  }, [userData, router]);

  useEffect(() => {
    const isRedirectRoute = redirectRegex.test(asPath);

    if (isRedirectRoute) {
      const handleVerifyEmail = async () => {
        try {
          const { oobCode } = query;

          await applyActionCode(auth, oobCode);

          dispatch(setEmailVerified(true));
          router.push(`${ROUTES.HOME}`);
        } catch (error) {
          handleOpenSnackBar(ALERT_COLORS.ERROR, 'Unable to verify email');
          router.push(`${ROUTES.SIGNUP}`);
          throw new Error(error);
        }
      };

      const { mode, oobCode } = query;

      if (mode === AUTH_MODES.PASSWORD_RESET) {
        router.push(`${ROUTES.PASSWORD_RESET}?oobCode=${oobCode}`);
        return;
      }

      if (mode === AUTH_MODES.VERIFY_EMAIL) {
        if (auth.currentUser?.emailVerified) {
          router.push(ROUTES.HOME);
          return;
        }

        handleVerifyEmail();
      }
    }
  }, [query]);
};

export default useRedirect;
