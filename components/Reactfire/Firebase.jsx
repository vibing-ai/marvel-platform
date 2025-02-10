import { FirebaseAppProvider } from 'reactfire';

import FirebaseProviders from './FirebaseProviders';

import config from '@/libs/firebase/config';

const Firebase = ({ children }) => {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <FirebaseProviders>{children}</FirebaseProviders>
    </FirebaseAppProvider>
  );
};

export default Firebase;
