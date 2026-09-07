import { RouterProvider } from 'react-router-dom';

import { router } from '@/router/router';

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
