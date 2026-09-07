import { bootstrapQueryOptions } from './bootstrap.queries';
import type { BootstrapScope } from './bootstrap.queryKeys';

import { getQueryClient } from '@/providers/QueryProvider';
import { reducerNames } from '@/store/reducerNames';
import { store, type ReduxState } from '@/store/reduxStore';

export const rootLoader = async () => {
  const queryClient = getQueryClient();
  const profile = (store.getState() as ReduxState)?.[reducerNames.global]
    ?.profile;

  const scope: BootstrapScope = {
    userID: profile?.baseUserInfo?.userID ?? '',
    menuUpdateAt: profile?.baseUserInfo?.globalMenuUpdateAt ?? '',
  };

  return queryClient.ensureQueryData(bootstrapQueryOptions(scope));
};
