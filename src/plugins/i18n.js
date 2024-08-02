import i18n from 'i18next';
import {
  default as Backend,
  default as LanguageDetector,
} from 'i18next-browser-languagedetector';
import ru from '../locales/ru';
import uz from '../locales/uz';
import { initReactI18next } from 'react-i18next';
const fallbackLng = localStorage.getItem('i18nextLng') || 'uz';
const debug = process.env.NODE_ENV === 'development';
const options = {
  debug,
  detection: { cache: ['cookie'], order: ['queryString', 'cookie'] },
  fallbackLng,
  resources: { uz, ru },
};
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(options);
export default i18n;
