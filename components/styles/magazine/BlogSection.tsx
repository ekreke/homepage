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
      className="relative px-6 py-32"
      style={{ background: "#faf8f5" }}
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
              Writing
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
              {t.blog.title}
            </h2>
          </div>
          <div className="hidden h-[1px] flex-1 bg-[#1a1a1a]/10 sm:ml-12 sm:block" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={i}
              inView={inView}
              readMore={t.blog.readMore}
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
            href={siteConfig.links.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border-b border-[#1a1a1a]/20 pb-1 text-sm font-medium text-[#1a1a1a]/60 transition-all duration-300 hover:border-[#c43333] hover:text-[#c43333]"
          >
            {t.blog.readAll}
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

function BlogCard({
  post,
  index,
  inView,
  readMore,
}: {
  post: PostSummary;
  index: number;
  inView: boolean;
  readMore: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + index * 0.12}s`,
      }}
    >
      <article className="flex flex-col gap-5">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#eae5df]">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-all duration-700"
              style={{
                filter: hovered ? "grayscale(0%)" : "grayscale(50%)",
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-6xl font-bold text-[#1a1a1a]/5">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: hovered
                ? "rgba(196, 51, 51, 0.05)"
                : "transparent",
            }}
          />
        </div>

        <div className="px-1">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-[#1a1a1a]/30">
            <time>{post.date}</time>
            {post.tags.length > 0 && (
              <>
                <span>·</span>
                <span>{post.tags[0]}</span>
              </>
            )}
          </div>

          <h3 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#c43333]">
            {post.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/50 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#c43333]">
            <span className="uppercase tracking-wider transition-all duration-300">
              {hovered ? "Read Article" : readMore}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300"
              style={{
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <path d="M2 6h8M6 3l3 3-3 3" />
            </svg>
          </div>
        </div>
      </article>
    </a>
  );
}
