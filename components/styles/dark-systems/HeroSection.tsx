"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="px-5 pb-16 pt-24 sm:px-[5vw] sm:pb-24 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-[6vw]">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8094ff]">{t.darkSystems.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(4rem,10vw,9.7rem)] font-black leading-[0.78] tracking-[-0.1em] text-[#f2f4f7]">
            {t.darkSystems.titleFirst}<br />{t.darkSystems.titleSecond}
          </h1>
        </div>
        <div className="border border-[#393e4c] bg-[radial-gradient(circle_at_70%_20%,#325cff,transparent_45%),#11141a] p-7 sm:p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8094ff]">{t.darkSystems.currentSignal}</p>
          <p className="mt-5 max-w-md text-base leading-7 text-[#d9deeb]">{t.hero.description}</p>
          <a href={siteConfig.cta.href} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full border border-[#d9deeb] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-white hover:text-[#08090c]">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
