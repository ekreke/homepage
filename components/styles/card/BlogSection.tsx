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
      style={{ background: "#f5f5f7" }}
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500">
            Writing
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.blog.title}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post, i) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block"
            >
              <TiltCard
                className="rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(139,92,246,0.12)] hover:border-violet-200 border border-transparent overflow-hidden"
                delay={0.1 + i * 0.1}
                inView={inView}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 to-fuchsia-100">
                      <span className="text-5xl font-bold text-violet-300">
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

                  <h3 className="mt-2 text-[15px] font-semibold leading-snug text-slate-900">
                    {post.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-violet-500"
                  >
                    <span>{t.blog.readMore}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 6h6M6 3l3 3-3 3" />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            </a>
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
            href={siteConfig.links.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-violet-100 hover:text-violet-600"
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
