const getCurrencyCode = (countryCode: string | number) => {
  const currencyCodes = {
    'en-US': '$', // United States
    'zh-CN': '¥', // China
    'ja-JP': '¥', // Japan
    'en-GB': '£', // United Kingdom
    'de-DE': '€', // Germany (Euro)
    'fr-FR': '€', // France (Euro)
    'it-IT': '€', // Italy (Euro)
    'es-ES': '€', // Spain (Euro)
    'ko-KR': '₩', // South Korea
    'ru-RU': '₽', // Russia
    'in-IN': '₹', // India
    'pt-BR': 'R$', // Brazil
    'ar-SA': '﷼', // Saudi Arabia
    'tr-TR': '₺', // Turkey
    'pl-PL': 'zł', // Poland
    'th-TH': '฿', // Thailand
    'vn-VN': '₫', // Vietnam
    'id-ID': 'Rp', // Indonesia
    'my-MY': 'RM', // Malaysia
    'ph-PH': '₱', // Philippines
    'ch-CH': 'Fr', // Switzerland
    'se-SE': 'kr', // Sweden
    'dk-DK': 'kr', // Denmark
    'no-NO': 'kr', // Norway
    'sg-SG': 'S$', // Singapore
    'hk-HK': 'HK$', // Hong Kong
    'tw-TW': 'NT$', // Taiwan
    'au-AU': 'A$', // Australia
    'nz-NZ': 'NZ$', // New Zealand
    'ca-CA': 'C$', // Canada
    'mx-MX': 'Mex$', // Mexico
    'za-ZA': 'R', // South Africa
    'il-IL': '₪', // Israel
    'ae-AE': 'د.إ', // UAE
    'eg-EG': 'E£', // Egypt
    // Euro zone countries
    'nl-NL': '€', // Netherlands
    'be-BE': '€', // Belgium
    'pt-PT': '€', // Portugal
    'gr-GR': '€', // Greece
    'ie-IE': '€', // Ireland
    'at-AT': '€', // Austria
    'fi-FI': '€', // Finland
    'sk-SK': '€', // Slovakia
    'lv-LV': '€', // Latvia
    'lt-LT': '€', // Lithuania
    'ee-EE': '€', // Estonia
  };

  return currencyCodes[countryCode as keyof typeof currencyCodes] ?? '$';
};

export default getCurrencyCode;
