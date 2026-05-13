"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

interface PostSummary {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  originalUrl: string;
}

export function BlogSection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts((data.posts ?? []).slice(0, 5)))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t.blog.title}
        </h2>

        <div className="mt-10 space-y-6">
          {posts.map((post) => (
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
