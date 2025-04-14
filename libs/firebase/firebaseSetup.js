import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const googleAuthProvider = new GoogleAuthProvider();

const EMULATOR_HOST = 'localhost';
const EMULATOR_PORTS = {
  auth: 9099,
  firestore: 8080,
  functions: 5001,
};

async function conditionallyConnectEmulators() {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname === EMULATOR_HOST
  ) {
    try {
      const authResponse = await axios.get(
        `http://${EMULATOR_HOST}:${EMULATOR_PORTS.auth}/`
      );
      if (authResponse.status === 200) {
        // eslint-disable-next-line no-console
        console.log('Emulator is running');
        connectAuthEmulator(
          auth,
          `http://${EMULATOR_HOST}:${EMULATOR_PORTS.auth}`
        );
        connectFirestoreEmulator(
          firestore,
          EMULATOR_HOST,
          EMULATOR_PORTS.firestore
        );
        connectFunctionsEmulator(
          functions,
          EMULATOR_HOST,
          EMULATOR_PORTS.functions
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.info(
        'Firebase Emulators not running, connecting to live environment instead.'
      );
    }
  }
}

conditionallyConnectEmulators();

export { auth, firestore, functions, googleAuthProvider };
