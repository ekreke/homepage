"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t.about.title}
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {siteConfig.bio}
        </p>

        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {siteConfig.story}
        </p>

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {t.about.skills}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
