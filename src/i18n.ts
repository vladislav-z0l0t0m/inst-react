import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import authRu from "./locales/ru/auth.json";
import authEn from "./locales/en/auth.json";
import commonRu from "./locales/ru/common.json";
import commonEn from "./locales/en/common.json";
import timeRu from "./locales/ru/time.json";
import timeEn from "./locales/en/time.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: { auth: authRu, common: commonRu, time: timeRu },
    en: { auth: authEn, common: commonEn, time: timeEn },
  },
  lng: "ru",
  fallbackLng: "en",
  ns: ["auth", "common", "time"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
