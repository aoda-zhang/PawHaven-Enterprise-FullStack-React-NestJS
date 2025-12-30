import '@pawhaven/design-system/globalTailwind.css';
import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// Enable i18n for the entire app
import '@pawhaven/i18n';

import { MUIThemeProvider } from './MUIThemeProvider';
import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

import { AppBootstrapGate } from '@/components/AppBootstrapGate';
import { SystemError } from '@/components/SystemError';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={SystemError}>
      <MUIThemeProvider>
        <StoreProvider>
          <QueryProvider>
            <AppBootstrapGate>{children}</AppBootstrapGate>
          </QueryProvider>
        </StoreProvider>
      </MUIThemeProvider>
    </ErrorBoundary>
  );
};
