import { Loading } from '@pawhaven/ui';
import type { ReactNode } from 'react';

import { useGetAppBootstrap } from '../../providers/appBootstrapAPI';
import { ErrorFallback } from '../ErrorFallback';

export const AppBootstrapGate = ({ children }: { children: ReactNode }) => {
  const { isLoading, isError } = useGetAppBootstrap();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  return <>{children}</>;
};
