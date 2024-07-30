/* eslint-disable global-require */
import i18n, { ResourceKey } from "i18next";
import { initReactI18next } from "react-i18next";

export type AppTranslations = {
  [namespace in
    | "appLayout"
    | "auth"
    | "common"
    | "product"
    | "field"
    | "aplicator"
    | "warehouse"
    | "movements"
    | "category"]: ResourceKey;
};

type Resource = {
  [language in "en" | "es"]: AppTranslations;
};

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources: Resource = {
  en: {
    appLayout: require("./locales/en/appLayout.json"),
    auth: require("./locales/en/auth.json"),
    common: require("./locales/en/common.json"),
    product: require("./locales/en/product.json"),
    field: require("./locales/en/field.json"),
    aplicator: require("./locales/en/aplicator.json"),
    warehouse: require("./locales/en/warehouse.json"),
    movements: require("./locales/en/movements.json"),
    category: require("./locales/en/category.json"),
  },
  es: {
    appLayout: require("./locales/es/appLayout.json"),
    auth: require("./locales/es/auth.json"),
    common: require("./locales/es/common.json"),
    product: require("./locales/es/product.json"),
    field: require("./locales/es/field.json"),
    aplicator: require("./locales/es/aplicator.json"),
    warehouse: require("./locales/es/warehouse.json"),
    movements: require("./locales/es/movements.json"),
    category: require("./locales/es/category.json"),
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { default as useTranslation } from "./useTranslation";

export default i18n;
