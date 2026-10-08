"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/config/site";

export function Navigation() {
  const { t } = useLanguage();
  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.blog, href: "#blog" },
    { label: t.nav.chat, href: "/chatgpt" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2d36] bg-[#08090c]/95 px-5 py-4 backdrop-blur sm:px-[5vw]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Link href="/" className="text-sm font-black tracking-[-0.05em] text-[#f2f4f7]">
          {siteConfig.name} / {t.darkSystems.brandSuffix}
        </Link>
        <div className="flex items-center gap-4 text-xs font-medium text-[#a7afc2] sm:gap-6">
          <div className="hidden items-center gap-5 md:flex">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              )
            )}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
