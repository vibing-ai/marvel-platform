import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUserData,
  updateUserData,
  updateUserFavorite,
} from '../thunks/user';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.error = 'Could not get user data';
        state.loading = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserFavorite.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.data) {
          state.data = {};
        }
        state.data.favorites = action.payload.favorites;
      })
      .addCase(updateUserFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, setUserData, setLoading } = userSlice.actions;

export default userSlice.reducer;
