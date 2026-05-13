"use client";

import { useLanguage } from "./LanguageProvider";
import { supportedLanguages, languageLabels } from "@/config/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as typeof language)}
      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm cursor-pointer"
    >
      {supportedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {languageLabels[lang]}
        </option>
      ))}
    </select>
  );
}
