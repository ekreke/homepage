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
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
          ? "bg-[#faf8f5]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-[#1a1a1a] transition-transform duration-300 hover:scale-105"
          >
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium tracking-wide text-[#1a1a1a]/70 transition-colors duration-300 hover:text-[#c43333]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#c43333] transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium tracking-wide text-[#1a1a1a]/70 transition-colors duration-300 hover:text-[#c43333]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#c43333] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
            <div className="flex items-center gap-3 pl-6">
              <LanguageSwitcher />
              <StyleSwitcher />
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] transition-colors duration-200 hover:bg-[#1a1a1a]/5 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <>
                  <path d="M3 6h14M3 10h14M3 14h14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#1a1a1a]/10 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-[#1a1a1a]/80 transition-colors duration-200 hover:text-[#c43333]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-[#1a1a1a]/80 transition-colors duration-200 hover:text-[#c43333]"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="mt-2 flex items-center gap-3 border-t border-[#1a1a1a]/10 pt-4">
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
