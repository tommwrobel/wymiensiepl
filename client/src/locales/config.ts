import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';
import translationPl from './pl/translation.json';

export const resources = {
  pl: { translation: translationPl },
  en: { translation: translationEn },
};

i18next
.use(initReactI18next)
.init({
  lng: 'pl',
  resources,
});
