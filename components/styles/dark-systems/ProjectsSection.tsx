"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { projects } from "@/config/projects";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-5 py-16 sm:px-[5vw] sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8094ff]">{t.darkSystems.openSourceWork}</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#f2f4f7]">{t.projects.title}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <a key={project.title} href={project.githubUrl ?? project.liveUrl ?? "/projects"} target={project.githubUrl || project.liveUrl ? "_blank" : undefined} rel={project.githubUrl || project.liveUrl ? "noopener noreferrer" : undefined} className="group min-h-64 border border-[#393e4c] bg-[#101218] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#8094ff]">
              <p className="font-mono text-[13px] font-bold text-[#8094ff]">{String(index + 1).padStart(2, "0")}.0{index + 1}</p>
              <h3 className="mt-10 text-3xl font-black tracking-[-0.06em] text-[#f2f4f7]">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#a7afc2]">{project.description}</p>
              <span className="mt-6 inline-flex text-xs font-bold text-[#d9deeb] transition-colors group-hover:text-white">{t.projects.viewProject} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
