import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocale } from '@pawhaven/frontend-core/utils';
import { localeCodes } from '@pawhaven/shared';

import deDE from './de-DE.json';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const defaultLanguage = localeCodes['en-US'];
const languageResources = {
  [localeCodes['zh-CN']]: { translation: zhCN },
  [localeCodes['en-US']]: { translation: enUS },
  [localeCodes['de-DE']]: { translation: deDE },
};
const currentLanguage = getLocale(
  defaultLanguage,
  Object.keys(languageResources),
);

i18n.use(initReactI18next).init({
  resources: languageResources,
  lng: currentLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
