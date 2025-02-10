import { doc, setDoc } from 'firebase/firestore';

import { auth, firestore } from '@/libs/redux/store';

const setReadStatus = (messages) => {
  try {
    messages.forEach((message) => {
      const newMessage = message;
      const setCol = doc(
        firestore,
        `users/${auth.currentUser.uid}/notifications`,
        message.id
      );
      setDoc(setCol, newMessage);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export { setReadStatus };
