import { Loading } from '@pawhaven/ui';
import type { ReactNode } from 'react';

import { useGetAppBootstrap } from '../../providers/appBootstrapAPI';
import { SystemError } from '../SystemError';

export const AppBootstrapGate = ({ children }: { children: ReactNode }) => {
  const { isLoading, isError } = useGetAppBootstrap();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <SystemError />;
  }

  return <>{children}</>;
};
