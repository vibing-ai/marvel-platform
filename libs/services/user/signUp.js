import { createUserWithEmailAndPassword } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { sendVerification } from './manageUser';

import { AUTH_ERROR_MESSAGES } from '@/libs/constants/auth';

import { auth, functions } from '@/libs/redux/store';

const signUp = async (email, password, fullName) => {
  try {
    const createUser = httpsCallable(functions, 'signUpUser');

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

const signUpWithGoogle = async (user) => {
  try {
    const createUser = httpsCallable(functions, 'signUpUser');
    await createUser({ 
      email: user.email, 
      fullName: user.displayName, 
      uid: user.uid 
    });
    return user;
  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

export { signUp, signUpWithGoogle };
