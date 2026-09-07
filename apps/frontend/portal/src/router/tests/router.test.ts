import { describe, expect, it, vi } from 'vitest';

import { routePaths } from '@/router/routePaths';
import { rootRoute } from '@/router/router';

vi.mock('@/config', () => ({
  loadConfig: () => ({ env: 'test', query: {} }),
}));

interface StaticRoute {
  path?: string;
  id?: string;
  loader?: unknown;
  children?: StaticRoute[];
}

const root = rootRoute as unknown as StaticRoute;
const children = root.children ?? [];

const childPaths = (route: StaticRoute): Array<string | undefined> =>
  (route.children ?? []).map((child) => child.path);

const routeByPath = (path: string) => children.find((c) => c.path === path);

describe('static route tree', () => {
  it('mounts the root layout at /', () => {
    expect(root.path).toBe(routePaths.home);
  });

  it('serves every public application path', () => {
    expect(childPaths(root)).toEqual(
      expect.arrayContaining([
        routePaths.login,
        routePaths.register,
        routePaths.rescueGuides,
        routePaths.rescueCases,
        routePaths.rescueCaseDetail,
        '*',
      ]),
    );
  });

  it('guards protected routes behind an authenticated parent route', () => {
    const authenticated = children.find(
      (child) => child.id === 'authenticated',
    );

    expect(authenticated).toBeDefined();
    expect(authenticated?.loader).toBeTypeOf('function');
    expect(childPaths(authenticated ?? {})).toContain(routePaths.reportAnimal);
  });

  it('does not expose protected paths as public routes', () => {
    expect(childPaths(root)).not.toContain(routePaths.reportAnimal);
  });

  it('loads route-critical data before rendering data routes', () => {
    expect(routeByPath(routePaths.rescueCases)?.loader).toBeTypeOf('function');
    expect(routeByPath(routePaths.rescueCaseDetail)?.loader).toBeTypeOf(
      'function',
    );
  });
});
