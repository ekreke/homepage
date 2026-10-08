"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-y border-[#393e4c] px-5 py-16 sm:px-[5vw] sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8094ff]">{t.about.title}</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#f2f4f7]">{t.darkSystems.systemFocus}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-[#d9deeb]">{t.site.bio}</p>
          <p className="mt-5 max-w-3xl leading-7 text-[#a7afc2]">{t.site.story}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {siteConfig.skills.map((skill) => (
              <span key={skill} className="border border-[#393e4c] bg-[#101218] px-3 py-2 text-xs font-semibold text-[#d9deeb]">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
