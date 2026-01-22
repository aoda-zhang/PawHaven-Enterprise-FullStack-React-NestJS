import { useQuery } from '@tanstack/react-query';

import { getAppBootstrap } from './requests';

export const GlobalQueryKeys = {
  global: ['GLOBAL'] as const,
  appBootstrap: (userID?: string, menuUpdateAt?: string) =>
    [...GlobalQueryKeys.global, 'APPBOOTSTRAP', userID, menuUpdateAt] as const,
};

export const useGetAppBootstrap = (userID?: string, menuUpdateAt?: string) => {
  const query = useQuery({
    queryKey: GlobalQueryKeys.appBootstrap(userID, menuUpdateAt),
    queryFn: getAppBootstrap,
    // staleTime: Infinity,
    staleTime: 0,
    gcTime: 0,
    // gcTime: Infinity,
    // meta: { persist: true },
  });

  return query;
};
