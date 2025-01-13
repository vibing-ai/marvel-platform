import { createContext, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { Provider, useDispatch } from "react-redux";

import SnackBar from "@/components/SnackBar";

import useRedirect from "@/libs/hooks/useRedirect";

import { setLoading, setUser } from "@/libs/redux/slices/authSlice";
import { setUserData } from "@/libs/redux/slices/userSlice";
import store, { auth, firestore, functions } from "@/libs/redux/store";

const AuthContext = createContext();

/**
 * Creates an authentication provider to observe authentication state changes.
 *
 * @param {Object} children - The child components to render.
 * @return {Object} The child components wrapped in the authentication provider.
 */
const AuthProvider = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Default Message");

  const handleOpenSnackBar = (newSeverity, newMessage) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  const memoizedValue = useMemo(() => {
    return {
      handleOpenSnackBar,
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return null;

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
