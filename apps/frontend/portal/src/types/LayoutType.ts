import type { ReactElement } from 'react';
import type { NavigateFunction } from 'react-router-dom';

export const menuTypes = {
  link: 'link',
  component: 'component',
} as const;

export type MenuType = (typeof menuTypes)[keyof typeof menuTypes];

export interface MenuItemType {
  label: string;
  to?: string;
  classNames?: string[];
  isAvailableOnMobile?: boolean;
  isOnlyMobile?: boolean;
  component?: string | ReactElement;
  action?: string;
  props?: Record<string, unknown>;
  type: MenuType;
}

export interface MenuRenderType {
  menuItems: MenuItemType[];
  activePath?: string;
  navigate: NavigateFunction;
}

export type RouterHandle = {
  isMenuAvailable?: boolean;
  isRequireUserLogin?: boolean;
  isFooterAvailable?: boolean;
  isLazyLoad?: boolean;
};

export interface RouterInfoType {
  data: Record<string, unknown> | undefined;
  handle: RouterHandle;
  id: string;
  params: Record<string, unknown> | undefined;
  pathname: string;
}

export interface RootLayoutHeaderProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  currentRouterInfo?: RouterInfoType;
}
