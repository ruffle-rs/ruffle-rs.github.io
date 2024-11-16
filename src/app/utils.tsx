import defaultTranslations from "@/i18n/translations.en.json";

export type TranslationObject = {
  [key: string]: string | TranslationObject;
};

export const getNestedTranslation = (
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

export function getBaseTranslation(translationKey: string): string {
  return (
    getNestedTranslation(defaultTranslations, translationKey) || translationKey
  );
}
