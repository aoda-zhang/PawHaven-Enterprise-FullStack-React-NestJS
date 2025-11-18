import '@pawhaven/design-system/globalTailwind.css';
import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// Enable i18n for the entire app
import '@pawhaven/i18n';

import MUIThemeProvider from './MUIThemeProvider';
import QueryProvider from './QueryProvider';
import StoreProvider from './StoreProvider';

import SystemError from '@/components/SystemError';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <MUIThemeProvider>
      <StoreProvider>
        <ErrorBoundary FallbackComponent={SystemError}>
          <QueryProvider>{children}</QueryProvider>
        </ErrorBoundary>
      </StoreProvider>
    </MUIThemeProvider>
  );
};

export default AppProvider;
