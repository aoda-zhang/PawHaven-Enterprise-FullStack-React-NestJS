import { Loading } from '@pawhaven/ui';
import { type ReactNode } from 'react';

import { useGetAppBootstrap } from './apis/queries';
import type { LandingDataType } from './landingContext';
import { LandingContext } from './landingContext';

import { SystemError } from '@/components/SystemError';

interface LandingProps {
  children: ReactNode;
}
export const Landing = ({ children }: LandingProps) => {
  const { data, isError, isLoading } = useGetAppBootstrap();

  const contextValue: LandingDataType = data ?? {
    menus: [],
    routers: [],
  };

  return (
    <LandingContext.Provider value={contextValue}>
      {isLoading && <Loading />}
      {!isLoading && isError && <SystemError />}
      {!isLoading && !isError && children}
    </LandingContext.Provider>
  );
};
