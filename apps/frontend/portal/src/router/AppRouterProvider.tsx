import { SuspenseWrapper } from '@pawhaven/ui';
import { type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routerElementMapping } from './routerElementMapping';

import { AuthGuard } from '@/features/Auth/AuthGuard';
import { useLandingContext } from '@/features/Landing/landingContext';
import type { RouterEle } from '@/types/LayoutType';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

const applyRouteWrappers = (router: ReactNode) => {
  /**
   * Route-level wrappers.
   * Order matters: outer → inner.
   * Add new guards/layouts here when needed.
   */
  const routeWrappers = [
    (node: ReactNode) => <AuthGuard>{node}</AuthGuard>,
    // (node: ReactNode) => <PermissionGuard>{node}</PermissionGuard>,
    // (node: ReactNode) => <FeatureFlagGuard>{node}</FeatureFlagGuard>,
  ];

  return routeWrappers.reduceRight((node, wrap) => wrap(node), router);
};

const buildRouteElement = (route: RouterEle) => {
  const handle = route?.handle ?? {};
  const isLazyLoadElement = handle.isLazyLoad ?? true;
  const isChildRoute = !route?.children;

  const rawElement = isLazyLoadElement ? (
    <SuspenseWrapper>{routerElementMapping[route?.element]}</SuspenseWrapper>
  ) : (
    routerElementMapping[route?.element]
  );

  if (!isChildRoute) {
    return rawElement;
  }

  return applyRouteWrappers(rawElement);
};

const routesMapping = (routesFromAPI: RouterEle[]): RouteObject[] => {
  const routes = routesFromAPI.map((route) => {
    const mappedRoute: RouteObject = {
      path: route?.path,
      element: buildRouteElement(route),
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
