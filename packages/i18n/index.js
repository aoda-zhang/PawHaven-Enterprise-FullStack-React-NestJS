import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localeCodes } from '@pawhaven/shared';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    supportedLngs: Object.keys(localeCodes),
    fallbackLng: localeCodes?.['en-US'],
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;
