import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  completed: false,
  tempData: {},
  systemConfig: {
    emailNotifs: false,
    pushNotifs: false,
    reminders: false,
    theme: false,
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    reset: () => initialState,
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = { ...state.tempData, ...action.payload };
    },
    clearTempData: (state) => {
      state.tempData = {};
    },
    setSystemConfig: (state, action) => {
      state.systemConfig = { ...state.systemConfig, ...action.payload };
    },
    clearSystemConfig: (state) => {
      state.systemConfig = {
        emailNotifs: false,
        pushNotifs: false,
        reminders: false,
        theme: false,
      };
    },
  },
});

export const {
  reset,
  setStep,
  setCompleted,
  setTempData,
  clearTempData,
  setSystemConfig,
  clearSystemConfig,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
