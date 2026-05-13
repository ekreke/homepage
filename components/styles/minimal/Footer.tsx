"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-100 px-6 py-12 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {t.footer.copyright}
        </p>

        <div className="flex items-center gap-4">
          {siteConfig.links.github && (
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
            </a>
          )}
          {siteConfig.links.blog && (
            <a
              href={siteConfig.links.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Blog"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 4h14M2 9h10M2 14h6" />
              </svg>
            </a>
          )}
          {siteConfig.links.bento && (
            <a
              href={siteConfig.links.bento}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Bento"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="6" height="6" rx="1" />
                <rect x="10" y="2" width="6" height="6" rx="1" />
                <rect x="2" y="10" width="6" height="6" rx="1" />
                <rect x="10" y="10" width="6" height="6" rx="1" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
