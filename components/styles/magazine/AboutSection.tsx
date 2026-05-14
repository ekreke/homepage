"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function AboutSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-32"
      style={{ background: "#faf8f5" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div
              className="lg:sticky lg:top-32"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-30px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#c43333]">
                About
              </span>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl">
                {t.about.title}
              </h2>
              <div className="mt-6 h-[2px] w-16 bg-[#c43333] magazine-line-expand" />
              <p className="mt-6 font-serif text-base italic leading-relaxed text-[#1a1a1a]/40">
                "Design is intelligence made visible."
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              className="space-y-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              }}
            >
              <div className="border-l-2 border-[#c43333]/30 pl-6">
                <p className="font-serif text-lg leading-[1.8] text-[#1a1a1a]/80 sm:text-xl">
                  {siteConfig.bio}
                </p>
              </div>

              <div
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                }}
              >
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                  {t.about.story}
                </h3>
                <p className="font-serif text-base leading-[1.8] text-[#1a1a1a]/60">
                  {siteConfig.story}
                </p>
              </div>

              <div
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
                }}
              >
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                  {t.about.skills}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {siteConfig.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className="inline-flex items-center border border-[#1a1a1a]/10 px-5 py-2.5 text-sm font-medium text-[#1a1a1a]/70 transition-all duration-300 hover:border-[#c43333]/40 hover:text-[#c43333] hover:shadow-sm"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(15px)",
                        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + i * 0.08}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
