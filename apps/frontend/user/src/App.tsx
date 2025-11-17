import type { FC } from 'react';

import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
};

export default App;
