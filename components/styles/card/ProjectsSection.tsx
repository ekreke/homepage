"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { projects } from "@/config/projects";

function useInView(threshold = 0.1) {
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
    setTransform(`perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.02, 1.02, 1.02)`);
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

export function ProjectsSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-32"
      style={{ background: "#ffffff" }}
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-500">
            Work
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.projects.title}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <TiltCard
              key={project.title}
              className={`card-shimmer-border rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] hover:border-blue-200 border border-transparent overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
              delay={0.1 + i * 0.1}
              inView={inView}
            >
              <div className={`group relative overflow-hidden ${i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-blue-500"
                >
                  <span>View Project</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6h6M6 3l3 3-3 3" />
                  </svg>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div
          className="mt-8"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.5s",
          }}
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
          >
            {t.projects.viewAll}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M2 6h8M6 3l3 3-3 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
