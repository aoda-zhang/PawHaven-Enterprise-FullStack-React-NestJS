import { SuspenseWrapper } from '@pawhaven/ui';
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

export const AppRouterProvider = () => {
  const { routers } = useAppBootstrapState();

  const router = useMemo(() => {
    const defaultRoute = [
      {
        path: '/',
        element: (
          <SuspenseWrapper>{routerElementMapping.rootLayout}</SuspenseWrapper>
        ),
        errorElement: routerElementMapping.errorFallback,
        children: [
          {
            path: '',
            element: (
              <SuspenseWrapper>{routerElementMapping.home}</SuspenseWrapper>
            ),
            errorElement: routerElementMapping.errorFallback,
          },
        ],
      },
    ];
    let mappedRoutes: RouteObject[] = defaultRoute;

    if (routers && routers.length > 0) {
      mappedRoutes = routesMapping(routers);
    }

    return createBrowserRouter(mappedRoutes);
  }, [routers]);

  return <RouterProvider router={router} />;
};
