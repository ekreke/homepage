"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 sm:text-2xl">
          {t.hero.tagline}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href={siteConfig.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 cursor-pointer"
          >
            {t.hero.cta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white cursor-pointer"
          >
            GitHub
          </a>
        </div>
        <div className="mt-16 animate-bounce text-gray-400 dark:text-gray-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto"
          >
            <path d="M10 4v12M4 10l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
