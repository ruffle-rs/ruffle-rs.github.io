"use client";

import React, { useEffect, useState } from "react";
import defaultTranslations from "@/i18n/translations.en.json";

const languages = {
  en: "English",
  es: "Español",
  // ...
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
  if (typeof acc === "string") {
    return acc;
  }
  return undefined;
};

async function translate(translationKey: string) {
  const language = await getAvailableLanguage();

  // Helper function to load translations
  const loadTranslations = async (lang: string) => {
    try {
      return await import(`@/i18n/translations.${lang}.json`);
    } catch {
      console.warn(`Translation file for language "${lang}" not found.`);
      return null;
    }
  };

  // Load translations for the selected language and the default language
  const translations = await loadTranslations(language);

  // Attempt to get the translation in the selected language, then fall back to default
  const translation =
    getNestedTranslation(translations, translationKey) ||
    getNestedTranslation(defaultTranslations, translationKey);

  // Render the translation if found; otherwise, return the key
  return translation || translationKey;
}

export const t = (translationKey: string): string => {
  const defaultTranslation =
    getNestedTranslation(defaultTranslations, translationKey) || translationKey;
  const [translation, setTranslation] = useState(defaultTranslation);

  const updateTranslation = async () => {
    const translatedText = await translate(translationKey);
    setTranslation(translatedText);
  };

  useEffect(() => {
    // Initial translation update
    updateTranslation();

    // Update translation when the language in localStorage changes from other browsing context
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "next-export-i18n-lang") {
        updateTranslation();
      }
    };

    // Update translation when the language in localStorage changes from current browsing context
    const handleLocalStorageLangChange = () => {
      updateTranslation();
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "localStorageLangChange",
      handleLocalStorageLangChange,
    );

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageLangChange",
        handleLocalStorageLangChange,
      );
    };
  }, [translationKey]);

  return translation;
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
      className={className}
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
