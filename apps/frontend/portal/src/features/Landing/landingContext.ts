import type { MenuItem } from '@pawhaven/shared/types/menus.schema';
import type { RouterItem } from '@pawhaven/shared/types/routers.schema';
import { createContext, useContext } from 'react';

export interface LandingDataType {
  menus: MenuItem[];
  routers: RouterItem[];
}

export const LandingContext = createContext<LandingDataType>({
  menus: [] as MenuItem[],
  routers: [] as RouterItem[],
});

export const useLandingContext = (): LandingDataType => {
  const context = useContext(LandingContext);
  return context;
};
