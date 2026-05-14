"use client";

import { useEffect, useRef, useState } from "react";
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

export function BlogSection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const { ref: sectionRef, inView } = useInView(0.1);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts((data.posts ?? []).slice(0, 4)))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="px-6 py-32"
      style={{ background: "#ffffff" }}
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
              Writing
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.blog.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
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
            href={siteConfig.links.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
          >
            {t.blog.readAll}
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

function BlogCard({
  post,
  index,
  inView,
}: {
  post: PostSummary;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-all duration-500"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
              filter: hovered ? "grayscale(0%)" : "grayscale(20%)",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold text-slate-200">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-slate-400"
        >
          <time>{post.date}</time>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags[0]}</span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-[15px] font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
          {post.title}
        </h3>

        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-slate-400 transition-colors duration-200 group-hover:text-slate-600"
        >
          <span>Read</span>
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
    </a>
  );
}
