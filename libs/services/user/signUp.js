import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

import { sendVerification } from "./manageUser";

import { AUTH_ERROR_MESSAGES } from "@/libs/constants/auth";

import { auth, functions } from "@/libs/redux/store";
import { googleAuthProvider } from "@/libs/firebase/config";

const signUp = async (email, password, fullName) => {
  try {
    const createUser = httpsCallable(functions, "signUpUser");

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUser({ email, fullName, uid: response.user.uid });
    await sendVerification(response.user);

    return response.user;
  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

const signUpGoogle = async () => {
  try {
    const createUser = httpsCallable(functions, "signUpUser");
    const data = await signInWithPopup(auth, googleAuthProvider);

    await createUser({
      email: data.user.email,
      fullName: data.user.displayName,
      uid: data.user.uid,
    });

    return data;
  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

export { signUp, signUpGoogle };
