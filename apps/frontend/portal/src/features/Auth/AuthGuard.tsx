import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useVerify } from './apis/queries';

import { useCurrentRouteMeta } from '@/hooks/useCurrentRouteMeta';
import { routePaths } from '@/router/routePaths';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { routerMeta = {} } = useCurrentRouteMeta();
  const { data: isAuthenticated, isError } = useVerify(routerMeta);
  if (
    routerMeta?.isRequireUserLogin &&
    (isError || isAuthenticated === false)
  ) {
    return <Navigate to={routePaths.login} replace />;
  }
  return <>{children}</>;
};
