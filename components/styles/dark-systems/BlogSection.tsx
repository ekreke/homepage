"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { siteConfig } from "@/config/site";

interface PostSummary {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

export function BlogSection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => setPosts((data.posts ?? []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="border-t border-[#393e4c] px-5 py-16 sm:px-[5vw] sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8094ff]">{t.darkSystems.writing}</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#f2f4f7]">{t.blog.title}</h2>
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="border border-[#393e4c] bg-[#101218] p-6 transition-colors hover:border-[#8094ff]">
                <p className="font-mono text-xs text-[#8094ff]">{post.date}</p>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-[#f2f4f7]">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#a7afc2]">{post.excerpt}</p>
                <span className="mt-6 inline-flex text-xs font-bold text-[#d9deeb]">{t.blog.readMore} →</span>
              </a>
            ))}
          </div>
        ) : (
          <a href={siteConfig.links.blog} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex border border-[#393e4c] px-4 py-3 text-sm font-bold text-[#d9deeb] transition-colors hover:border-[#8094ff] hover:text-white">
            {t.blog.readAll} →
          </a>
        )}
      </div>
    </section>
  );
}
