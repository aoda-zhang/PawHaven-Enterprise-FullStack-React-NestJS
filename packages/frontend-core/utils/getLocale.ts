import LocaleKeys from '../constants/localeKey';

import storageTool from './storage';

const getLocale = (
  defaultLanguage: string = LocaleKeys['en-US'],
  supportLanguages: string[] = [],
) => {
  const currentBrowserLanguage =
    typeof window !== 'undefined' ? window.navigator.language : '';
  const choosedLanguage = storageTool.get('I18NKEY');
  if (choosedLanguage) {
    return choosedLanguage;
  }

  if (
    currentBrowserLanguage &&
    supportLanguages.includes(currentBrowserLanguage)
  ) {
    return currentBrowserLanguage;
  }

  return defaultLanguage;
};
export default getLocale;
