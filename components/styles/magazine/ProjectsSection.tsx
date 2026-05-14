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
      className="relative px-6 py-32"
      style={{ background: "#f5f2ee" }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 flex items-end justify-between"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#c43333]">
              Selected Work
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
              {t.projects.title}
            </h2>
          </div>
          <div className="hidden h-[1px] flex-1 bg-[#1a1a1a]/10 sm:ml-12 sm:block" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
              viewProject={t.projects.viewProject}
            />
          ))}
        </div>

        <div
          className="mt-12 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.8s",
          }}
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 border-b border-[#1a1a1a]/20 pb-1 text-sm font-medium text-[#1a1a1a]/60 transition-all duration-300 hover:border-[#c43333] hover:text-[#c43333]"
          >
            {t.projects.viewAll}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M2 7h10M7 3l4 4-4 4" />
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
  viewProject,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  viewProject: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + index * 0.12}s`,
      }}
    >
      <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-[#eae5df]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-all duration-700"
          style={{
            filter: hovered ? "grayscale(0%)" : "grayscale(40%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0 bg-[#1a1a1a]/0 transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)"
              : "linear-gradient(to top, rgba(26,26,26,0) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-1">
        <h3 className="font-serif text-xl font-semibold tracking-tight text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#c43333]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/50 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#c43333]">
          <span className="uppercase tracking-wider">{viewProject}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M2 6h8M6 3l3 3-3 3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
