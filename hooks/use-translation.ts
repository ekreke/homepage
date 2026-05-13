"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";

export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
}
