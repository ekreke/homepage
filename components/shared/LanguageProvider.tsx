"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, defaultLanguage } from "@/config/i18n";
import en from "@/i18n/en.json";

type Translations = typeof en;

const translationsCache: Partial<Record<Language, Translations>> = {};

async function loadTranslations(lang: Language): Promise<Translations> {
  if (translationsCache[lang]) return translationsCache[lang]!;
  const mod = await import(`@/i18n/${lang}.json`);
  translationsCache[lang] = mod.default as Translations;
  return translationsCache[lang]!;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: en,
  loading: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [t, setT] = useState<Translations>(en);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved) {
      setLanguageState(saved);
      loadTranslations(saved).then(setT);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLoading(true);
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    loadTranslations(lang).then((translations) => {
      setT(translations);
      setLoading(false);
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
