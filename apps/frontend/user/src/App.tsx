import type { FC } from 'react';

import { AppProvider } from './providers/AppProvider';
import { AppRouterProvider } from './router/AppRouterProvider';

export const App: FC = () => {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
};
