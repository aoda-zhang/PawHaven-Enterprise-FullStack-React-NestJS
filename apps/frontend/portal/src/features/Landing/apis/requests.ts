import type { MenuItem } from '@pawhaven/shared/types/menus.schema';
import type { RouteObject } from 'react-router-dom';

import { apiClient } from '@/utils/apiClient';

// Fetch menu and router from server side
export const getAppBootstrap = async (): Promise<{
  menus: MenuItem[];
  routers: RouteObject[];
}> => {
  return apiClient.get('core/app/bootstrap');
};
