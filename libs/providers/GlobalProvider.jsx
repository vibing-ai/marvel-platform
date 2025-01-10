import { createContext, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Provider, useDispatch } from 'react-redux';

import SnackBar from '@/components/SnackBar';

import useRedirect from '@/libs/hooks/useRedirect';

import { setLoading, setUser } from '@/libs/redux/slices/authSlice';
import { setUserData } from '@/libs/redux/slices/userSlice';
import store, { auth, firestore, functions } from '@/libs/redux/store';
import { useRouter } from 'next/router';
import ROUTES from '@/libs/constants/routes';

import fetchUserData from '@/libs/redux/thunks/user';

const AuthContext = createContext();
const GoogleProvider = new GoogleAuthProvider();

/**
 * Creates an authentication provider to observe authentication state changes.
 *
 * @param {Object} children - The child components to render.
 * @return {Object} The child components wrapped in the authentication provider.
 */
const AuthProvider = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('Default Message');

  const handleOpenSnackBar = (newSeverity, newMessage) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  // Google oauth login action
  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const { user } = result;
      const { claims } = await user.getIdTokenResult(true);

      // fetch user data & check onboarding flow
      dispatch(setUser({ ...user.toJSON(), claims }));
      const userData = await dispatch(fetchUserData({ firestore, id: user.uid })).unwrap();
      if (userData?.needsBoarding) {
        router.replace(ROUTES.ONBOARDING);
      } else {
        router.replace(ROUTES.HOME);
      }

      handleOpenSnackBar('success', 'Successfully logged in with Google');
    } catch (error) {
      handleOpenSnackBar('error', error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const memoizedValue = useMemo(() => {
    return {
      handleOpenSnackBar,
      handleGoogleLogin,
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get auth user claims
        const { claims } = await user.getIdTokenResult(true);
        return dispatch(setUser({ ...user.toJSON(), claims }));
      }

      dispatch(setLoading(false));
      dispatch(setUser(false));
      return dispatch(setUserData(false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useRedirect(firestore, functions, handleOpenSnackBar);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
      <SnackBar
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </AuthContext.Provider>
  );
};

/**
 * Creates a global provider component that wraps the entire app and provides access to the Redux store and authentication.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {ReactNode} props.children - The child elements to be rendered within the provider.
 * @return {JSX.Element} The provider component.
 */
const GlobalProvider = (props) => {
  const { children } = props;
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export { AuthContext };

export default GlobalProvider;
