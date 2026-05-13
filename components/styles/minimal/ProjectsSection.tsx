"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { projects } from "@/config/projects";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t.projects.title}
        </h2>

        <div className="mt-10 space-y-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group border-b border-gray-100 pb-8 last:border-0 dark:border-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 3h7v7M13 3L5 11" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <a
          href="/projects"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
        >
          {t.projects.viewAll}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
