import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './languages/en'
import { es } from './languages/es'

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: en,
    es: es,
  },
})

export default i18n
