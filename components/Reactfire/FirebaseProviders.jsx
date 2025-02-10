import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

const FirebaseProviders = ({ children }) => {
  const app = useFirebaseApp();
  const firestore = getFirestore(app);
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
};

export default FirebaseProviders;
