import { configureStore } from "@reduxjs/toolkit";

import { auth, firestore, functions } from "../firebase/firebaseSetup";

import authReducer from "./slices/authSlice";
// cacheReducer is used to cache the state of the application
import cacheReducer from "./slices/cacheSlice";
import chatReducer from "./slices/chatSlice";
import historyReducer from "./slices/historySlice";
import onboardingReducer from "./slices/onboardingSlice";
import userReducer from "./slices/userSlice";

import { reducers as toolsReducers } from "@/tools/data";

/**
 * Configure Redux store with performance optimizations
 * - Implements caching strategy
 * - Optimizes state updates
 * - Configures middleware for better performance
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tools: toolsReducers?.toolsReducer,
    toolHistory: toolsReducers.toolHistoryReducer,
    chat: chatReducer,
    onboarding: onboardingReducer,
    history: historyReducer,
    // cacheReducer is used to cache the state of the application
    cache: cacheReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: ["cache"],
      },
    }),
});

export { auth, firestore, functions };
export default store;
