import { NotFound, RouterErrorFallback } from '@pawhaven/frontend-core';
import { Loading } from '@pawhaven/ui';
import { createBrowserRouter, ScrollRestoration } from 'react-router-dom';

import {
  AuthenticatedLayout,
  loginRoute,
  registerRoute,
  requireUser,
} from '@/features/Auth/route';
import { homeRoute } from '@/features/Home/route';
import { reportAnimalRoute } from '@/features/ReportAnimal/route';
import { rescueCasesRoute } from '@/features/RescueCases/route';
import { rescueDetailRoute } from '@/features/RescueDetail/route';
import { rescueGuideRoute } from '@/features/RescueGuide/route';
import { useIsStableEnv } from '@/hooks/useIsStableEnv';
import { RootLayout } from '@/layout';
import {
  rootLoader,
  rootShouldRevalidate,
} from '@/layout/api/rootLayout.loader';
import { RootLayoutFooter } from '@/layout/RootLayoutFooter';
import { routePaths } from '@/router/routePaths';

const RouteErrorBoundary = () => {
  const isStableEnv = useIsStableEnv();

  return (
    <>
      <ScrollRestoration />
      <RouterErrorFallback
        isStableEnv={isStableEnv}
        footer={<RootLayoutFooter />}
      />
    </>
  );
};

const NotFoundRoute = () => {
  const isStableEnv = useIsStableEnv();

  return (
    <>
      <ScrollRestoration />
      <NotFound isStableEnv={isStableEnv} footer={<RootLayoutFooter />} />
    </>
  );
};

const RouteHydrateFallback = () => <Loading />;

export const rootRoute = {
  path: routePaths.home,
  Component: RootLayout,
  loader: rootLoader,
  shouldRevalidate: rootShouldRevalidate,
  ErrorBoundary: RouteErrorBoundary,
  HydrateFallback: RouteHydrateFallback,
  children: [
    homeRoute,
    loginRoute,
    registerRoute,
    rescueGuideRoute,
    rescueCasesRoute,
    rescueDetailRoute,
    {
      id: 'authenticated',
      loader: requireUser,
      Component: AuthenticatedLayout,
      children: [reportAnimalRoute],
    },
    {
      path: '*',
      Component: NotFoundRoute,
    },
  ],
};

export const router = createBrowserRouter([rootRoute]);
