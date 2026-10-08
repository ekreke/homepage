"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#393e4c] px-5 py-10 sm:px-[5vw]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[#a7afc2] sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.copyright}</p>
        <div className="flex flex-wrap gap-5">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">{t.hero.cta}</a>
          <a href={siteConfig.links.blog} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">{t.nav.blog}</a>
          <a href="/projects" className="transition-colors hover:text-white">{t.nav.projects}</a>
        </div>
      </div>
    </footer>
  );
}
