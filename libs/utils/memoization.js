import { useCallback, useMemo } from "react";

/**
 * Custom hook for memoizing values to prevent unnecessary re-renders
 * Used in conjunction with the cache slice (references cacheSlice.js lines 22-29)
 *
 * @param {any} value - The value to memoize
 * @param {Array} deps - Dependency array that triggers recalculation
 * @returns {any} Memoized value
 */
export const useMemoizedValue = (value, deps) => {
  return useMemo(() => value, deps);
};

/**
 * Custom hook for memoizing callbacks to maintain reference equality
 * Optimizes event handlers in components (references Chat.jsx lines 185-194)
 *
 * @param {Function} callback - The callback function to memoize
 * @param {Array} deps - Dependency array that triggers recreation
 * @returns {Function} Memoized callback
 */
export const useMemoizedCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

/**
 * Creates a memoized selector for Redux state
 * Optimizes state selection (references store.js lines 21-30)
 *
 * @param {Function} selector - Selector function to memoize
 * @param {Function} memoizer - Optional custom memoization function
 * @returns {Function} Memoized selector function
 */
export const createSelector = (selector, memoizer) => {
  // Cache last arguments and result
  let lastArgs = null;
  let lastResult = null;

  return (...args) => {
    // Return cached result if arguments haven't changed
    if (lastArgs && args.every((arg, i) => arg === lastArgs[i])) {
      return lastResult;
    }

    // Update cache and compute new result
    lastArgs = args;
    lastResult = selector(...args);
    return lastResult;
  };
};
