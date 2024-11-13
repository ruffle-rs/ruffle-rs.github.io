const en = require("./translations.en.json");
const es = require("./translations.es.json");

const i18n = {
  translations: {
    en,
    es,
  },
  defaultLang: "en",
  useBrowserDefault: true,
  languageDataStore: "localStorage",
};

module.exports = i18n;
