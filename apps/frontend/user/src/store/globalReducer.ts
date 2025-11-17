import LocaleKeys from '@pawhaven/frontend-core/constants/localeKey';
import storageTool from '@pawhaven/frontend-core/utils/storage';
import { createSlice } from '@reduxjs/toolkit';

import { useReduxSelector } from '../hooks/reduxHooks';

import reducerNames from './reducerNames';
import type { ReduxState } from './reduxStore';

import storageKeys from '@/constants/StorageKeys';
import type { ProfileType } from '@/features/Auth/types';

export interface GlobalStateType {
  profile: ProfileType;
  locale: string;
  isSysMaintain: boolean;
}
const initialState: GlobalStateType = {
  profile: {
    baseUserInfo: {
      userName: '',
      userID: '',
      globalMenuUpdateAt: '',
      globalRouterUpdateAt: '',
    },
    accessToken: '',
  },
  locale: storageTool.get(storageKeys.I18NKEY) || LocaleKeys['en-US'],
  isSysMaintain: true,
};

const globalReducer = createSlice({
  name: reducerNames.global,
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export default globalReducer.reducer;

export const { setProfile } = globalReducer.actions;
export const useGlobalState = () => {
  return useReduxSelector(
    (state: ReduxState) => state?.global ?? {},
  ) as GlobalStateType;
};
