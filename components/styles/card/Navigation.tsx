"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";
import { StyleSwitcher } from "@/components/shared/StyleSwitcher";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.chat, href: "/chat" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-white/20 bg-white/80 shadow-lg shadow-black/5"
            : "border-white/10 bg-white/60 shadow-md shadow-black/5"
        }`}
      >
        <Link
          href="/"
          className="px-4 py-2 text-[13px] font-semibold text-slate-800 transition-colors duration-200 hover:text-blue-600"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="nav-underline group relative rounded-full px-4 py-2 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="nav-underline group relative rounded-full px-4 py-2 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="ml-1 flex items-center gap-1 border-l border-slate-200 pl-2">
          <LanguageSwitcher />
          <StyleSwitcher />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M3 3l10 10M13 3L3 13" />
            ) : (
              <>
                <path d="M2 5h12M2 8h12M2 11h12" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-white/20 bg-white/90 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
