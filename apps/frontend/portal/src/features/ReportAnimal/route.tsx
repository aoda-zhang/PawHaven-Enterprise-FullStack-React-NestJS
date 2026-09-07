import { routePaths } from '@/router/routePaths';

export const reportAnimalRoute = {
  path: routePaths.reportAnimal,
  lazy: async () => {
    const { ReportAnimal } = await import('@/features/ReportAnimal');
    return { Component: ReportAnimal };
  },
};
