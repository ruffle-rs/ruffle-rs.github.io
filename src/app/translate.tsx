"use client";

import React, { useEffect, useState, useCallback } from "react";
import defaultTranslations from "@/i18n/translations.en.json";
import classes from "@/components/header.module.css";

const languages = {
  en: "English (United States)",
  ar: "العربية",
  ca: "Català",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  cs: "Čeština",
  nl: "Nederlands",
  fr: "Français (France)",
  de: "Deutsch",
  he: "עברית (ישראל)",
  hu: "Magyar",
  id: "Indonesian",
  it: "Italiano (Italia)",
  ja: "日本語",
  ko: "한국어",
  pl: "Polski (Polska)",
  "pt-PT": "Português (Portugal)",
  "pt-BR": "Português brasileiro",
  ro: "Romanian",
  ru: "Русский",
  sk: "Slovenčina (Slovensko)",
  "es-ES": "Español",
  "sv-SE": "Svenska",
  tr: "Türkçe",
  uk: "Українська",
};

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

interface LanguageSelectorProps {
  className?: string;
}

async function getAvailableLanguage() {
  const defaultLanguage = "en";
  const storedLanguage = window.localStorage.getItem("next-export-i18n-lang");
  const browserLanguage =
    window.navigator.language ||
    (window.navigator.languages && window.navigator.languages[0]);
  const language = storedLanguage || browserLanguage || defaultLanguage;

  // Helper function to check if a language file exists
  const checkLanguageFileExists = async (lang: string) => {
    try {
      await import(`@/i18n/translations.${lang}.json`);
      return lang;
    } catch {
      console.warn(`Translation file for language "${lang}" not found.`);
      return null;
    }
  };

  // Check for full and base language, then fallback to default language
  const lang =
    (await checkLanguageFileExists(language)) ||
    (await checkLanguageFileExists(language.split("-")[0])) ||
    defaultLanguage;
  return lang;
}

const getNestedTranslation = (
  obj: TranslationObject,
  key: string,
): string | undefined => {
  let acc: TranslationObject | string | undefined = obj;
  for (let i = 0; i < key.split(".").length; i++) {
    const part = key.split(".")[i];
    if (acc && typeof acc !== "string" && acc[part] !== undefined) {
      acc = acc[part];
    } else {
      acc = undefined; // If a part is not found, stop and return undefined
      break;
    }
  }
  return typeof acc === "string" ? acc : undefined;
};

async function fetchTranslations(lang: string) {
  try {
    const translations = await import(`@/i18n/translations.${lang}.json`);
    return translations;
  } catch {
    console.warn(`Translation file for language "${lang}" not found.`);
    return null;
  }
}

export function useTranslation() {
  const [translations, setTranslations] =
    useState<TranslationObject>(defaultTranslations);

  useEffect(() => {
    const fetchLanguageAndTranslations = async () => {
      const lang = await getAvailableLanguage();
      const loadedTranslations = await fetchTranslations(lang);
      setTranslations(loadedTranslations || defaultTranslations);
    };

    fetchLanguageAndTranslations();

    const handleLocalStorageLangChange = () => fetchLanguageAndTranslations();

    window.addEventListener(
      "localStorageLangChange",
      handleLocalStorageLangChange,
    );
    return () =>
      window.removeEventListener(
        "localStorageLangChange",
        handleLocalStorageLangChange,
      );
  }, []);

  const t = useCallback(
    (translationKey: string): string => {
      return (
        getNestedTranslation(translations, translationKey) ||
        getNestedTranslation(defaultTranslations, translationKey) ||
        translationKey
      );
    },
    [translations],
  );

  return { t };
}

interface TransProps {
  i18nKey: string; // Translation key
  components?: React.ReactNode[]; // Components to inject into placeholders
}

export const Trans: React.FC<TransProps> = ({ i18nKey, components = [] }) => {
  const { t } = useTranslation();
  const translation = t(i18nKey);

  const renderWithPlaceholders = (template: string) => {
    const parts = template.split(/({{.*?}})/g); // Split on placeholders like {{key}}
    return parts.map((part) => {
      const match = part.match(/{{(.*?)}}/); // Match placeholders
      if (match) {
        const placeholderKey = match[1];
        const component = components.find(
          (comp) => React.isValidElement(comp) && comp.key === placeholderKey,
        );
        if (component) {
          return component;
        }
      }
      return part; // Return plain text if no placeholder
    });
  };

  return <>{renderWithPlaceholders(translation)}</>;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>("");

  useEffect(() => {
    // Fetch and set the selected language
    const fetchLanguage = async () => {
      const lang = await getAvailableLanguage();
      setSelectedLang(lang);
    };

    fetchLanguage(); // Set the language initially
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLang = event.target.value;
    setSelectedLang(newLang);
    window.localStorage.setItem("next-export-i18n-lang", newLang);

    // Dispatch an event to notify other components or contexts of the language change
    const langChangeEvent = new Event("localStorageLangChange");
    window.dispatchEvent(langChangeEvent);
  };

  return (
    <select
      className={`${classes.languageSelector} ${className || ""}`}
      value={selectedLang}
      onChange={handleLanguageChange}
    >
      {Object.entries(languages).map(([langCode, langName]) => (
        <option key={langCode} value={langCode}>
          {langName}
        </option>
      ))}
    </select>
  );
};
