import type { RouterHandle } from '@pawhaven/shared/types';
import { useMatches } from 'react-router-dom';

export interface RouteMetaResult {
  routerMeta?: RouterHandle;
  path?: string;
}

/**
 * Returns metadata (handle) and pathname of the currently matched route.
 * Used by guards/layouts to make route-level decisions (e.g. auth).
 */
export const useCurrentRouteMeta = (): RouteMetaResult => {
  const matches = useMatches();

  if (!matches || matches.length === 0) {
    return {};
  }

  const currentMatch = matches[matches.length - 1];

  return {
    routerMeta: currentMatch?.handle as RouterHandle | undefined,
    path: currentMatch.pathname,
  };
};
