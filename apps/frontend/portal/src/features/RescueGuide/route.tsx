import { routePaths } from '@/router/routePaths';

export const rescueGuideRoute = {
  path: routePaths.rescueGuides,
  lazy: async () => {
    const { RescueGuide } = await import('@/features/RescueGuide');
    return { Component: RescueGuide };
  },
};
