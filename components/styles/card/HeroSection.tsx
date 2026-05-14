"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

function useCountUp(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

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
    setTransform(`perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`);
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

export function HeroSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView(0.1);
  const projectCount = useCountUp(projects.length, 1500, inView);
  const skillCount = useCountUp(siteConfig.skills.length, 1500, inView);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
      style={{ background: "#f5f5f7" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl card-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-fuchsia-200/20 blur-3xl card-float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl card-float"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TiltCard
            className="col-span-full sm:col-span-1 lg:col-span-1 row-span-2 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] hover:border-blue-200 border border-transparent"
            delay={0}
            inView={inView}
          >
            <div className="flex flex-col items-center text-center h-full justify-center">
              <div className="relative">
                <img
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  className="h-28 w-28 rounded-3xl object-cover shadow-lg"
                  style={{ animation: "floatY 3s ease-in-out infinite" }}
                />
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 border-2 border-white shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
              <h1 className="mt-5 text-2xl font-bold text-slate-900">{siteConfig.name}</h1>
              <p className="mt-1 text-sm text-slate-500">{t.hero.tagline}</p>
              <div className="mt-5 flex gap-3">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-spin-hover flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.bento}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-spin-hover flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="6" height="6" rx="1" />
                    <rect x="10" y="2" width="6" height="6" rx="1" />
                    <rect x="2" y="10" width="6" height="6" rx="1" />
                    <rect x="10" y="10" width="6" height="6" rx="1" />
                  </svg>
                </a>
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="col-span-full sm:col-span-1 rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] hover:border-blue-200 border border-transparent"
            delay={0.1}
            inView={inView}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{projectCount}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Projects</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="col-span-full sm:col-span-1 rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] hover:border-blue-200 border border-transparent"
            delay={0.15}
            inView={inView}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{skillCount}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Skills</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="col-span-full sm:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_50px_rgb(59,130,246,0.25)]"
            delay={0.2}
            inView={inView}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{t.hero.cta}</h2>
                <p className="mt-2 text-sm text-white/70 max-w-xs">
                  I&apos;m always open to discussing new projects, creative ideas or opportunities.
                </p>
              </div>
              <a
                href={siteConfig.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-pulse mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

const projects = [
  { title: "EcoShop", description: "Sustainable e-commerce" },
  { title: "HealthTracker", description: "Health metrics app" },
  { title: "Analytics Pro", description: "Business dashboard" },
];
