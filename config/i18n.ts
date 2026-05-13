export const supportedLanguages = ["en", "zh", "zh-TW", "de"] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = "en";

export const languageLabels: Record<Language, string> = {
  en: "English",
  zh: "简体中文",
  "zh-TW": "繁體中文",
  de: "Deutsch",
};
