import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { supportedLngs } from './supportedLngs';

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend((language) => import(`./locales/${language}.json`)))
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLngs,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;
