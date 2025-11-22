import '@pawhaven/design-system/globalTailwind.css';
import { initMonitor } from '@pawhaven/frontend-core/utils';
import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// Enable i18n for the entire app
import '@pawhaven/i18n';

import { MUIThemeProvider } from './MUIThemeProvider';
import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

import SystemError from '@/components/SystemError';
import { loadConfig } from '@/config';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const configs = loadConfig();
  initMonitor({ ...configs?.sentry });

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
