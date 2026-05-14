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
        if (entry.isIntersecting) setInView(true);
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
      className="px-6 py-32"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-16px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                About
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t.about.title}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-8">
              <p
                className="text-lg leading-[1.8] text-slate-600"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                }}
              >
                {siteConfig.bio}
              </p>

              <p
                className="text-base leading-[1.8] text-slate-500"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                }}
              >
                {siteConfig.story}
              </p>

              <div
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                }}
              >
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {t.about.skills}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-medium text-slate-600 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(10px)",
                        transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.06}s`,
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
