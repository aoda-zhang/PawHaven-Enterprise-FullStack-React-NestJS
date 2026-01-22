import type { RouteObject } from 'react-router-dom';

import type { MenuItemType } from '@/types/LayoutType';
import { apiClient } from '@/utils/apiClient';

// Fetch menu and router from server side
export const getAppBootstrap = async (): Promise<{
  menus: MenuItemType[];
  routers: RouteObject[];
}> => {
  return apiClient.get('core/app/bootstrap');
};
