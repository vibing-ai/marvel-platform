import { useEffect, useState } from "react";

/**
 * Custom hook for implementing infinite scrolling with performance optimizations
 * @param {Function} fetchMore - Callback function to fetch next page of data
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Distance from bottom to trigger next fetch (default: 100px)
 * @returns {Object} loading - Loading state for UI feedback
 */
export const useInfiniteScroll = (fetchMore, options = {}) => {
  // Threshold configuration for scroll detection
  const { threshold = 100 } = options;
  // Loading state to prevent multiple simultaneous fetches
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optimized scroll handler using async/await for better performance
    const handleScroll = async () => {
      // Prevent multiple fetches while loading
      if (loading) return;

      // Performance optimization: Cache DOM measurements
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Calculate if user is near bottom using threshold
      // Performance optimization: Minimize calculations in scroll handler
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        setLoading(true);
        // Fetch more data asynchronously
        await fetchMore();
        setLoading(false);
      }
    };

    // Performance optimization: Use passive event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, loading, threshold]); // Minimal dependency array for optimal rerenders

  return { loading };
};
