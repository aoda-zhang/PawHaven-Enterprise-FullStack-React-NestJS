import getRequestQueryOptions from '@pawhaven/frontend-core/cores/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useState, type ReactNode } from 'react';

import envConfig from '../config';

import useIsStableEnv from '@/hooks/useIsStableEnv';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const IsStableEnv = useIsStableEnv();
  const [queryClient] = useState(
    () =>
      new QueryClient(
        getRequestQueryOptions({
          refetchOnReconnect:
            envConfig?.queryOption?.refetchOnReconnect ?? true,
          refetchOnWindowFocus:
            envConfig?.queryOption?.refetchOnWindowFocus ?? false,
          staleTime: Number(envConfig?.queryOption?.staleTime) ?? 5 * 60 * 1000,
          cacheTime:
            Number(envConfig?.queryOption?.cacheTime) ?? 30 * 60 * 1000,
          onAuthError: () => {
            // navigate('/auth/login');
          },
          onPermissionError: () => {},
        }),
      ),
  );

  const [asyncStoragePersister] = useState(() =>
    createAsyncStoragePersister({
      storage: window.localStorage,
      key: 'PAWHAVEN_DATA_PERSIST',
    }),
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      {children}
      {!IsStableEnv && <ReactQueryDevtools initialIsOpen />}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider;
