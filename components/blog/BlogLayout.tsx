"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useStyle } from "@/hooks/use-style";
import { getStyleComponents, defaultStyle } from "@/lib/style-registry";

export function BlogLayout({ children }: { children: ReactNode }) {
  const { style } = useStyle();
  const activeStyle = style ?? defaultStyle;
  const components = getStyleComponents(activeStyle);
  const Navigation = components?.Navigation;
  const Footer = components?.Footer;

  return (
    <div className="min-h-screen flex flex-col">
      {Navigation && <Navigation />}
      <main className="flex-1">{children}</main>
      {Footer && <Footer />}
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 6H2M5 3L2 6l3 3" />
      </svg>
      {label}
    </Link>
  );
}
