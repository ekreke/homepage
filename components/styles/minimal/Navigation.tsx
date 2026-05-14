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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-slate-900 transition-opacity duration-200 hover:opacity-60"
          >
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
            <div className="ml-2 flex items-center gap-2 border-l border-slate-200 pl-4">
              <LanguageSwitcher />
              <StyleSwitcher />
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <div className="border-t border-slate-100 py-5 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-3">
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
