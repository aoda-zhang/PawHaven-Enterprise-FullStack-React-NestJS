import { createSlice } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';

import { useReduxSelector } from '../hooks/reduxHooks';

import { reducerNames } from './reducerNames';
import type { ReduxState } from './reduxStore';

import type { MenuItemType } from '@/types/LayoutType';

export interface AppBootstrapType {
  menus: MenuItemType[];
  routers: RouteObject[];
}
const initialState: AppBootstrapType = {
  menus: [],
  routers: [],
};

export const appBootstrapReducer = createSlice({
  name: reducerNames.bootstrap,
  initialState,
  reducers: {
    setGlobalMenus: (state, action) => {
      state.menus = action.payload;
    },
    setGlobalRouters: (state, action) => {
      state.routers = action.payload;
    },
  },
});

export const { setGlobalMenus, setGlobalRouters } = appBootstrapReducer.actions;
export const useAppBootstrapState = () => {
  return useReduxSelector(
    (state: ReduxState) => state?.[reducerNames.bootstrap] ?? {},
  ) as AppBootstrapType;
};
