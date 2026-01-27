import type { AuthFieldType, ProfileType } from '../types';

import { apiClient } from '@/utils/apiClient';

export const register = (userInfo: AuthFieldType): Promise<ProfileType> => {
  return apiClient.post('/auth/register', userInfo);
};

export const login = (userInfo: AuthFieldType): Promise<ProfileType> => {
  return apiClient.post('/auth/login', userInfo);
};

export const verify = (): Promise<boolean> => {
  return apiClient.get('/auth/verify');
};

export const refreshToken = (token: {
  refreshToken: string;
}): Promise<ProfileType> => {
  return apiClient.post('/auth/v1/refresh', token);
};
