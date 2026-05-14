"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

function useInView(threshold = 0.15) {
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

function TiltCard({
  children,
  className,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || undefined,
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        opacity: inView ? 1 : 0,
        animation: inView ? `cardBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards` : "none",
      }}
    >
      {children}
    </div>
  );
}

export function AboutSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView(0.1);

  const skills = siteConfig.skills.map((skill, i) => ({
    name: skill,
    icon: ["🎨", "⚛️", "📐", "🔍"][i % 4],
    color: [
      "bg-pink-100 text-pink-600",
      "bg-blue-100 text-blue-600",
      "bg-amber-100 text-amber-600",
      "bg-emerald-100 text-emerald-600",
    ][i % 4],
  }));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-32"
      style={{ background: "#f5f5f7" }}
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500">
            About
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.about.title}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <TiltCard
            className="lg:col-span-3 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(139,92,246,0.12)] hover:border-violet-200 border border-transparent"
            delay={0}
            inView={inView}
          >
            <div className="space-y-4">
              <p className="text-base leading-[1.8] text-slate-600">
                {siteConfig.bio}
              </p>
              <p className="text-base leading-[1.8] text-slate-500">
                {siteConfig.story}
              </p>
            </div>
          </TiltCard>

          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <TiltCard
                key={skill.name}
                className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(139,92,246,0.12)] hover:border-violet-200 border border-transparent flex flex-col items-center justify-center text-center"
                delay={0.1 + i * 0.08}
                inView={inView}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${skill.color.split(" ")[0]} text-2xl`}>
                  {skill.icon}
                </div>
                <span className="mt-3 text-[13px] font-semibold text-slate-700">
                  {skill.name}
                </span>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
