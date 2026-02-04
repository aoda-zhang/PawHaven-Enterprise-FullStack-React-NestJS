import type { MenuItem } from '@pawhaven/shared/types/menus.schema';
import type { NavigateFunction } from 'react-router-dom';

export const menuTypes = {
  link: 'link',
  component: 'component',
} as const;

export type MenuType = (typeof menuTypes)[keyof typeof menuTypes];
export interface MenuRenderType {
  menuItems: MenuItem[];
  activePath?: string;
  navigate: NavigateFunction;
}

export type RouterMeta = {
  isMenuAvailable?: boolean;
  isRequireUserLogin?: boolean;
  isFooterAvailable?: boolean;
  isLazyLoad?: boolean;
};

export interface RouterInfoType {
  data: Record<string, unknown> | undefined;
  handle: RouterMeta;
  id: string;
  params: Record<string, unknown> | undefined;
  pathname: string;
  element: string;
}

export interface RouterEle {
  handle?: RouterMeta;
  path: string;
  element: string;
  children?: RouterEle[];
}

export interface RootLayoutHeaderProps {
  menuItems: MenuItem[];
  navigate: NavigateFunction;
  currentRouterInfo?: RouterInfoType;
}
