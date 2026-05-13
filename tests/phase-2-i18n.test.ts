import { existsSync, readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();

function check(label: string, condition: boolean) {
  const status = condition ? "PASS" : "FAIL";
  console.log(`[${status}] ${label}`);
  if (!condition) process.exitCode = 1;
}

console.log("\n=== Phase 2: i18n System ===\n");

console.log("-- Configuration --");
check("config/i18n.ts exists", existsSync(join(root, "config/i18n.ts")));
const i18nConfig = readFileSync(join(root, "config/i18n.ts"), "utf-8");
check("config/i18n.ts exports supportedLanguages", i18nConfig.includes("supportedLanguages"));
check("config/i18n.ts exports defaultLanguage", i18nConfig.includes("defaultLanguage"));
check("config/i18n.ts exports languageLabels", i18nConfig.includes("languageLabels"));
check("config/i18n.ts includes 'en'", i18nConfig.includes('"en"'));
check("config/i18n.ts includes 'zh'", i18nConfig.includes('"zh"'));
check("config/i18n.ts includes 'zh-TW'", i18nConfig.includes('"zh-TW"'));
check("config/i18n.ts includes 'de'", i18nConfig.includes('"de"'));

console.log("\n-- Translation Files --");
const langFiles = ["en", "zh", "zh-TW", "de"] as const;
const translations: Record<string, Record<string, unknown>> = {};

for (const lang of langFiles) {
  const path = join(root, `i18n/${lang}.json`);
  check(`i18n/${lang}.json exists`, existsSync(path));
  if (existsSync(path)) {
    const content = JSON.parse(readFileSync(path, "utf-8"));
    translations[lang] = content;
  }
}

const topLevelKeys = Object.keys(translations["en"] || {});
check("en.json has top-level keys", topLevelKeys.length > 0);

for (const lang of ["zh", "zh-TW", "de"]) {
  if (translations[lang]) {
    const keys = Object.keys(translations[lang]);
    check(`${lang}.json has same top-level keys as en.json`, 
      keys.length === topLevelKeys.length && 
      keys.every((k) => topLevelKeys.includes(k)));
  }
}

console.log("\n-- Language Provider --");
check("components/shared/LanguageProvider.tsx exists", existsSync(join(root, "components/shared/LanguageProvider.tsx")));
const provider = readFileSync(join(root, "components/shared/LanguageProvider.tsx"), "utf-8");
check("LanguageProvider exports useLanguage hook", provider.includes("export function useLanguage"));
check("LanguageProvider uses localStorage", provider.includes("localStorage"));
check("LanguageProvider uses React Context", provider.includes("createContext"));

console.log("\n-- useTranslation Hook --");
check("hooks/use-translation.ts exists", existsSync(join(root, "hooks/use-translation.ts")));
const hook = readFileSync(join(root, "hooks/use-translation.ts"), "utf-8");
check("useTranslation exports t, language, setLanguage", 
  hook.includes("t") && hook.includes("language") && hook.includes("setLanguage"));

console.log("\n-- Language Switcher --");
check("components/shared/LanguageSwitcher.tsx exists", existsSync(join(root, "components/shared/LanguageSwitcher.tsx")));
const switcher = readFileSync(join(root, "components/shared/LanguageSwitcher.tsx"), "utf-8");
check("LanguageSwitcher uses supportedLanguages", switcher.includes("supportedLanguages"));
check("LanguageSwitcher calls setLanguage", switcher.includes("setLanguage"));

console.log("\n-- Layout Integration --");
const layout = readFileSync(join(root, "app/layout.tsx"), "utf-8");
check("app/layout.tsx imports LanguageProvider", layout.includes("LanguageProvider"));
check("app/layout.tsx wraps children with LanguageProvider", layout.includes("<LanguageProvider>"));

console.log("\n=== Done ===\n");
