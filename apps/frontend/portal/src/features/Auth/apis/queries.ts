import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { AuthFieldType, ProfileType } from '../types';

import * as AuthAPI from './requests';

import { useReduxDispatch } from '@/hooks/reduxHooks';
import { setProfile } from '@/store/globalReducer';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  return useMutation<ProfileType, Error, AuthFieldType>({
    mutationFn: (userInfo: AuthFieldType) => AuthAPI.login(userInfo),
    onSuccess: (loginInfo) => {
      dispatch(setProfile(loginInfo));
      navigate('/');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  return useMutation<ProfileType, Error, AuthFieldType>({
    mutationFn: (userInfo: AuthFieldType) => AuthAPI.register(userInfo),
    onSuccess: (loginInfo) => {
      dispatch(setProfile(loginInfo));
      navigate('/');
    },
  });
};
