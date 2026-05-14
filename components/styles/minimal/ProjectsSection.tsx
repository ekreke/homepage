"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { projects } from "@/config/projects";

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

export function ProjectsSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="px-6 py-32"
      style={{ background: "#f8fafc" }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          className="mb-12 flex items-end justify-between"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Work
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.projects.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        <div
          className="mt-10"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.6s",
          }}
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
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

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0 bg-slate-900/0 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 50%)"
              : "transparent",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
          {project.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-slate-400 transition-colors duration-200 group-hover:text-slate-600"
        >
          <span>View</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M3 6h6M6 3l3 3-3 3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
