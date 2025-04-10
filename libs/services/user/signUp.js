import { createUserWithEmailAndPassword } from 'firebase/auth';

import { AUTH_ERROR_MESSAGES } from '@/libs/constants/auth';

import { auth, functions } from '@/libs/redux/store';

import { sendVerification } from './manageUser';

import axios from "axios"

import functions_urls from "../../constants/google_functions_url_selector"

const signUp = async (email, password, fullName) => {
  try {

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (auth_response) => {
        try {

          await sendVerification(auth_response.user);

          console.log(functions_urls().signUpUser);
          
          const response = await axios.get(`${functions_urls().signUpUser}`, {
            params: {
              email: email, 
              fullName: fullName,
              uid: auth_response.user.uid
            }
          });

          if (response.status == 200 && response.data.status == 'success') {
            return auth_response.user;
          }
          else {
            console.log(response.message);
            throw new Error(response.message);
          }

        } catch (error) {
          console.log(error);
          throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
        }
      });

  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

export { signUp };
