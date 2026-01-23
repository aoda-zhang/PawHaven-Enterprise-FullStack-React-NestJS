import { I18nextProvider } from 'react-i18next';
import i18n from '.';
import { Suspense } from 'react';

export const I18nProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<p>...</p>}>{children}</Suspense>
    </I18nextProvider>
  );
};
