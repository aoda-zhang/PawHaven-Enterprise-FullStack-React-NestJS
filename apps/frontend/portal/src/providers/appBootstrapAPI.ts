import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { RouteObject } from 'react-router-dom';

import { setGlobalMenus, setGlobalRouters } from '../store/appBootstrapReducer';

import { useReduxDispatch } from '@/hooks/reduxHooks';
import type { MenuItemType } from '@/types/LayoutType';
import { apiClient } from '@/utils/apiClient';

export const GlobalQueryKeys = {
  global: ['GLOBAL'] as const,
  appBootstrap: (userID?: string, menuUpdateAt?: string) =>
    [...GlobalQueryKeys.global, 'APPBOOTSTRAP', userID, menuUpdateAt] as const,
};

// Fetch menu and router from server side
const getAppBootstrap = async (): Promise<{
  menus: MenuItemType[];
  routers: RouteObject[];
}> => {
  return apiClient.get('core/bootstrap');
};

export const useGetAppBootstrap = (userID?: string, menuUpdateAt?: string) => {
  const dispatch = useReduxDispatch();

  const query = useQuery({
    queryKey: GlobalQueryKeys.appBootstrap(userID, menuUpdateAt),
    queryFn: getAppBootstrap,
    staleTime: Infinity,
    // meta: { persist: true },
  });

  const { data, isSuccess } = query;

  useEffect(() => {
    if (!isSuccess || !data) return;

    dispatch(setGlobalMenus(data.menus));
    dispatch(setGlobalRouters(data.routers));
  }, [isSuccess, data, dispatch]);

  return query;
};
