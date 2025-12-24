import { lazy } from 'react';
import type { ComponentType } from 'react';

/**
 * Helper function that wraps React.lazy to load a named export from a module.
 * React.lazy requires the component to be the default export, but this project prefers named exports.
 * Use this helper for code-splitting React components that are exported as named exports.
 *
 * Example usage:
 * const LazyComponent = lazyImport(() => import('./MyComponent'), 'MyComponent');
 */

export function lazyImport<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, ComponentType<any>>,
  K extends keyof T,
>(loader: () => Promise<T>, key: K) {
  return lazy(() =>
    loader().then((module) => ({
      default: module[key],
    })),
  );
}
