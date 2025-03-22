import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUserData,
  updateToolFrequency,
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
      .addCase(updateUserFavorite.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(updateUserFavorite.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { favoritesId, command } = action.payload;
        if (command === 'add') {
          state.data.favoriteToolsId = [
            ...(state.data.favoriteToolsId || []),
            favoritesId,
          ];
        } else if (command === 'remove') {
          state.data.favoriteToolsId = state.data.favoriteToolsId.filter(
            (id) => id !== favoritesId
          );
        }
      })
      .addCase(updateToolFrequency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateToolFrequency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateToolFrequency.fulfilled, (state, action) => {
        state.loading = false;
        const { toolId } = action.payload;
        if (!state.data.toolsFrequency[toolId]) {
          state.data.toolsFrequency[toolId] = 1;
        } else {
          state.data.toolsFrequency[toolId] += 1;
        }
      });
  },
});

export const { reset, setUserData, setLoading } = userSlice.actions;

export default userSlice.reducer;
