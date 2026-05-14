"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const nameChars = siteConfig.name.split("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #f8fafc 0%, #ffffff 60%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div
          className="mb-8 flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="relative">
            <img
              src={siteConfig.avatar}
              alt={siteConfig.name}
              className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl md:text-8xl">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: visible
                  ? `charReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                  : "none",
                animationDelay: `${0.35 + i * 0.04}s`,
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          className="mt-5 text-lg text-slate-500 sm:text-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}
        >
          {t.hero.tagline}
        </p>

        <div
          className="mt-10 flex items-center justify-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
          }}
        >
          <a
            href={siteConfig.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-[13px] font-medium text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10"
          >
            {t.hero.cta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease-out 1.2s",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Scroll</span>
          <div className="h-6 w-[1px] bg-slate-200">
            <div
              className="h-2 w-full bg-slate-400/40"
              style={{
                animation: "minimalBreathe 2.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
