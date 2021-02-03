import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import translationEN from './assets/locales/en/translation.json';
import translationRU from './assets/locales/ru/translation.json';
import translationBE from './assets/locales/be/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  be: {
    translation: translationBE,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: JSON.parse(localStorage.getItem('settings') || '{}').lang || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'ru', 'be'],
  });

export default i18n;
