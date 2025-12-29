import { Loading, SuspenseWrapper } from '@pawhaven/ui';
import { useMemo, type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routerElementMapping } from './routerElementMapping';

import { useAppBootstrapState } from '@/store/appBootstrapReducer';

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

// eslint-disable-next-line consistent-return
export const AppRouterProvider = () => {
  const { routers } = useAppBootstrapState();
  const router = useMemo(() => {
    const mappedRoutes = routesMapping(routers);
    if (mappedRoutes?.length > 0) {
      return createBrowserRouter(mappedRoutes);
    }
    return null;
  }, [routers]);

  if (router) {
    return <RouterProvider router={router} />;
  }
};
