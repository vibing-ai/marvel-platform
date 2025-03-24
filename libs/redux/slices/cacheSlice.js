import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing application-wide caching
 * Implements performance optimizations for frequently accessed data
 */
const cacheSlice = createSlice({
  name: "cache",
  // Initialize separate caches for different data types
  initialState: {
    assets: {}, // Cache for static assets (images, etc.)
    toolOutputs: {}, // Cache for AI tool generation results
    chatHistory: {}, // Cache for chat conversations
  },
  reducers: {
    /**
     * Stores data in the appropriate cache with timestamp
     * @param {string} type - Cache type (assets/toolOutputs/chatHistory)
     * @param {string} key - Unique identifier for cached item
     * @param {any} data - Data to be cached
     */
    setCachedData: (state, action) => {
      const { key, data, type } = action.payload;
      // Store data with timestamp for cache invalidation
      state[type][key] = {
        data,
        timestamp: Date.now(),
      };
    },

    /**
     * Clears specific cache type or all caches
     * @param {string} type - Optional: specific cache to clear
     */
    clearCache: (state, action) => {
      const { type } = action.payload;
      // Clear specific cache type if provided
      if (type) {
        state[type] = {};
      } else {
        // Clear all caches if no type specified
        state = { assets: {}, toolOutputs: {}, chatHistory: {} };
      }
    },
  },
});

export const { setCachedData, clearCache } = cacheSlice.actions;
export default cacheSlice.reducer;
