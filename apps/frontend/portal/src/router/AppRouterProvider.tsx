import { SuspenseWrapper } from '@pawhaven/ui';
import { type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routerElementMapping } from './routerElementMapping';

import { useLandingContext } from '@/features/Landing/landingContext';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

const routesMapping = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routesFromAPI: Array<Record<string, any>>,
): RouteObject[] => {
  const routes = routesFromAPI.map((route) => {
    const isLazyLoadElement = route?.handle?.isLazyLoad ?? true;
    const mappedRoute: RouteObject = {
      path: route?.path,
      element: isLazyLoadElement ? (
        <SuspenseWrapper>{routerElementMapping[route.element]}</SuspenseWrapper>
      ) : (
        routerElementMapping[route.element]
      ),
      handle: route?.handle,
      errorElement: routerElementMapping.errorFallback,
    };

    if (route?.children) {
      mappedRoute.children = routesMapping(route?.children);
    }

    return mappedRoute;
  });

  return routes;
};

export const AppRouterProvider = () => {
  const { routers } = useLandingContext();
  if (!routers || routers?.length === 0) {
    return null;
  }
  return (
    <RouterProvider router={createBrowserRouter(routesMapping(routers))} />
  );
};
