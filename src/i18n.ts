import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend"; // adding lazy loading for translations, more information here: https://react.i18next.com/legacy-v9/step-by-step-guide#2-lazy-loading-translations
import detector from "i18next-browser-languagedetector"; // auto detect the user language, more information here: https://react.i18next.com/legacy-v9/step-by-step-guide#c-auto-detect-the-user-language

i18n.use(Backend)
    .use(detector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["ru", "ua"],
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json", // locale files path
        },
        defaultNS: "common",
        fallbackLng: ["ru", "ua"],
    });

export default i18n;