# @pawhaven/i18n

`@pawhaven/i18n` is the shared internationalization (i18n) package for the PawHaven frontend ecosystem.

It centralizes language configuration and i18n initialization to ensure **consistency, scalability, and predictable behavior** across applications.

---

## What it does

- Provides a preconfigured `i18next` instance
- Defines supported languages as **business-level configuration**
- Handles language persistence and switching
- Optionally exposes a React `I18nProvider`

---

## Usage (React)

### 1. Wrap your application

```tsx
import { I18nProvider } from '@pawhaven/i18n';

export function App() {
  return (
    <I18nProvider>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Use translations

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

t('common.welcome');
```

### 3. Switch language

```tsx
import i18n from '@pawhaven/i18n';

i18n.changeLanguage('en');
```

### Adding a new language

1. Add language code

```tsx
// Add fr-BE
export const supportedLngs = ['zh-CN', 'en-US', 'de-DE', 'fr-BE'];
```

2. Add translation files

```tsx
locales / fr - BE.json;
```
