import { useMemo } from 'react';

import { loadConfig } from '@/config';

/**
 * Hook to determine if the current environment is production-like.
 * Returns true for both production (prod) and testing (test) environments.
 */
export const useIsStableEnv = (): boolean => {
  const isProdOrTest = useMemo(() => {
    const env = loadConfig()?.env;
    return env === 'prod' || env === 'test';
  }, []);

  return isProdOrTest;
};
