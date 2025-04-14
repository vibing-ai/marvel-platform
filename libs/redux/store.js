import { configureStore } from '@reduxjs/toolkit';

import { auth, googleAuthProvider, firestore, functions } from '../firebase/firebaseSetup';

import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import historyReducer from './slices/historySlice';
import onboardingReducer from './slices/onboardingSlice';
import userReducer from './slices/userSlice';

import { reducers as toolsReducers } from '@/tools/data';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tools: toolsReducers?.toolsReducer,
    toolHistory: toolsReducers.toolHistoryReducer,
    chat: chatReducer,
    onboarding: onboardingReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { auth, googleAuthProvider, firestore, functions };
export default store;
