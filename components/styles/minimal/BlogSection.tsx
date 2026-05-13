"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

const placeholderPosts = [
  {
    title: "Getting Started with Design Systems",
    date: "2025-01-15",
    slug: "getting-started-design-systems",
    excerpt:
      "A comprehensive guide to building and maintaining design systems that scale across products and teams.",
  },
  {
    title: "The Art of Minimal UI Design",
    date: "2025-01-10",
    slug: "art-minimal-ui-design",
    excerpt:
      "Exploring the principles of minimalism in user interface design and how less truly becomes more.",
  },
  {
    title: "React Performance Patterns",
    date: "2025-01-05",
    slug: "react-performance-patterns",
    excerpt:
      "Deep dive into React performance optimization techniques that make your apps lightning fast.",
  },
];

export function BlogSection() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t.blog.title}
        </h2>

        <div className="mt-10 space-y-6">
          {placeholderPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800"
            >
              <time className="text-sm text-gray-400 dark:text-gray-500">
                {post.date}
              </time>
              <h3 className="mt-1 text-lg font-medium text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>

        <a
          href={siteConfig.links.blog}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
        >
          {t.blog.readAll}
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
