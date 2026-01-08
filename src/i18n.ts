import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import authRu from "./locales/ru/auth.json";
import authEn from "./locales/en/auth.json";
import commonRu from "./locales/ru/common.json";
import commonEn from "./locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: { auth: authRu, common: commonRu },
    en: { auth: authEn, common: commonEn },
  },
  lng: "ru",
  fallbackLng: "en",
  ns: ["auth", "common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
