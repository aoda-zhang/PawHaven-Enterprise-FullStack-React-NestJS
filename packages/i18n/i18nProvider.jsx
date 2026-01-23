import { I18nextProvider } from 'react-i18next';
import './index';
import { Suspense } from 'react';

export const I18nProvider = ({ children }) => {
  return (
    <I18nextProvider>
      <Suspense fallback={<div>正在加载中</div>}>{children}</Suspense>
    </I18nextProvider>
  );
};
