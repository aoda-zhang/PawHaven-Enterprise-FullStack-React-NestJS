import { createContext, useContext } from 'react';

import type { MenuItemType, RouterEle } from '@/types/LayoutType';

export interface LandingDataType {
  menus: MenuItemType[];
  routers: RouterEle[];
}

export const LandingContext = createContext<LandingDataType>({
  menus: [] as MenuItemType[],
  routers: [] as RouterEle[],
});

export const useLandingContext = (): LandingDataType => {
  const context = useContext(LandingContext);
  return context;
};
