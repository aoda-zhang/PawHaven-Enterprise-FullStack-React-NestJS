import { createContext, useContext } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { MenuItemType } from '@/types/LayoutType';

export interface LandingDataType {
  menus: MenuItemType[];
  routers: RouteObject[];
}

export const LandingContext = createContext<LandingDataType>({
  menus: [] as MenuItemType[],
  routers: [] as RouteObject[],
});

export const useLandingContext = (): LandingDataType => {
  const context = useContext(LandingContext);
  return context;
};
