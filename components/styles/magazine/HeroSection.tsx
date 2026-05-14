"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nameChars = siteConfig.name.split("");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{ background: "#faf8f5" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div
        className="absolute left-10 top-32 hidden lg:block"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 0.5s",
        }}
      >
        <div className="magazine-float text-[120px] font-serif font-bold leading-none text-[#1a1a1a]/[0.04]">
          &amp;
        </div>
      </div>

      <div
        className="absolute bottom-20 right-10 hidden lg:block"
        style={{
          transform: `translateY(${-scrollY * 0.1}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 0.8s",
        }}
      >
        <div className="h-32 w-[1px] bg-[#c43333]/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          className="mb-6 flex items-center justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
        >
          <span className="h-[1px] w-12 bg-[#c43333]/40" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#c43333]">
            Portfolio
          </span>
          <span className="h-[1px] w-12 bg-[#c43333]/40" />
        </div>

        <h1 className="mb-6 font-serif text-6xl font-bold leading-[0.95] tracking-tight text-[#1a1a1a] sm:text-7xl md:text-8xl lg:text-9xl">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: visible
                  ? `charReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                  : "none",
                animationDelay: `${0.3 + i * 0.05}s`,
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          className="mx-auto mb-10 max-w-lg font-serif text-xl italic text-[#1a1a1a]/60 sm:text-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
          }}
        >
          {t.hero.tagline}
        </p>

        <div
          className="flex items-center justify-center gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s",
          }}
        >
          <a
            href={siteConfig.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-[#1a1a1a] bg-[#1a1a1a] px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#c43333] hover:border-[#c43333]"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a]/60 transition-colors duration-300 hover:text-[#1a1a1a]"
          >
            GitHub
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M4 2h8v8M12 2L4 10" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 1.5s",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/30">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-[#1a1a1a]/20">
            <div
              className="h-3 w-full bg-[#c43333]/60"
              style={{
                animation: "float 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
