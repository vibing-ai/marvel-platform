import dynamic from "next/dynamic";
import { Suspense } from "react";

/**
 * Higher-Order Component (HOC) for implementing lazy loading of components
 * Improves initial page load performance by code splitting
 *
 * @param {Function} importFunc - Dynamic import function for the component
 * @param {Component} LoadingComponent - Component to show while loading
 * @returns {Function} HOC wrapper function
 */
export function withLazyLoading(importFunc, LoadingComponent) {
  // Create dynamically loaded component using Next.js dynamic import
  // Disable SSR for better client-side performance
  const LazyComponent = dynamic(importFunc, {
    loading: () => <LoadingComponent />,
    ssr: false, // Disable server-side rendering for this component
  });

  // Return wrapped component with Suspense boundary
  return function WithLazyLoadingWrapper(props) {
    return (
      // Suspense provides fallback UI while component loads
      // Helps prevent layout shifts during component loading
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
