import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import authRu from "./locales/ru/auth.json";
import authEn from "./locales/en/auth.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: { auth: authRu },
    en: { auth: authEn },
  },
  lng: "ru",
  fallbackLng: "en",
  ns: ["auth"],
  defaultNS: "auth",
  interpolation: { escapeValue: false },
});

export default i18n;
