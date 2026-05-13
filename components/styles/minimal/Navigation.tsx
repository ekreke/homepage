"use client";

import { useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";
import { StyleSwitcher } from "@/components/shared/StyleSwitcher";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export function Navigation() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.blog, href: "#blog" },
    { label: t.nav.chat, href: "/chat" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="flex items-center justify-between px-6 py-3">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {siteConfig.name}
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4 dark:border-gray-700">
              <LanguageSwitcher />
              <StyleSwitcher />
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4L4 14" />
              ) : (
                <>
                  <path d="M2 5h14M2 9h14M2 13h14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                <LanguageSwitcher />
                <StyleSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
