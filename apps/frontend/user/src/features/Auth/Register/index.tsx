import { Button } from '@mui/material';
import { FormInput } from '@pawhaven/ui';
import { type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '../apis/queries';
import { AuthLayout } from '../authLayout';

import { routePaths } from '@/router/routePaths';

export const Register: FC = () => {
  const formProps = useForm({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate, isPending } = useRegister();
  return (
    <AuthLayout>
      <div className="flex flex-1 flex-col justify-center box-border p-6 lg:p-16 shadow-md">
        <div className="text-2xl mb-5 text-center">{t('auth.sighup')}</div>
        <FormProvider {...formProps}>
          <form>
            <FormInput
              variant="outlined"
              size="small"
              className="w-full lg:min-w-[24vw] lg:mb-2"
              label={t('auth.userName')}
              name="userName"
            />
            <FormInput
              type="password"
              variant="outlined"
              className="w-full lg:min-w-[24vw] lg:mb-2"
              size="small"
              label={t('auth.password')}
              name="password"
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full lg:min-w-[24vw] lg:mb-2"
              variant="contained"
              onClick={formProps.handleSubmit((data) => {
                mutate({
                  userName: data.userName,
                  password: data.password,
                });
              })}
            >
              {t('auth.sighup')}
            </Button>
          </form>
        </FormProvider>
        <p className="text-right mt-5">
          <span className="text-gray-400 mr-3">{t('auth.with_account')}</span>
          <button
            type="button"
            className="cursor-pointer text-primary"
            onClick={() => {
              navigate(routePaths.login);
            }}
          >
            {t('auth.login_now')}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
