"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setShowTop(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative px-6 py-20" style={{ background: "#1a1a1a" }}>
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#c43333]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl font-bold text-white">
              {siteConfig.name}
            </h3>
            <p className="mt-4 max-w-sm font-serif text-base italic leading-relaxed text-white/40">
              {siteConfig.bio}
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              Navigation
            </h4>
            <nav className="mt-6 flex flex-col gap-3">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Blog", href: "/blog" },
                { label: "Chat", href: "/chat" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-[1px] w-0 bg-[#c43333] transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              Connect
            </h4>
            <div className="mt-6 flex gap-4">
              {siteConfig.links.github && (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c43333] hover:text-[#c43333]"
                  aria-label="GitHub"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="transition-transform duration-300 group-hover:rotate-12"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                </a>
              )}
              {siteConfig.links.blog && (
                <a
                  href={siteConfig.links.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c43333] hover:text-[#c43333]"
                  aria-label="Blog"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:rotate-12"
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
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c43333] hover:text-[#c43333]"
                  aria-label="Bento"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:rotate-12"
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
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/30">
            {t.footer.copyright}
          </p>
          <p className="text-xs text-white/20">
            {t.footer.madeWith} <span className="text-[#c43333]">♥</span> {t.footer.and} Next.js
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center border border-[#1a1a1a]/10 bg-[#faf8f5] text-[#1a1a1a]/60 shadow-lg transition-all duration-500 hover:border-[#c43333] hover:text-[#c43333] ${
          showTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 14V4M4 9l5-5 5 5" />
        </svg>
      </button>
    </footer>
  );
}
