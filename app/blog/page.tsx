import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogLayout, BackLink } from "@/components/blog/BlogLayout";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest articles and blog posts",
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <BlogLayout>
      <div className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <BackLink href="/" label="Back" />

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Blog
          </h1>

          {posts.length === 0 && (
            <p className="mt-8 text-gray-500 dark:text-gray-400">No articles found.</p>
          )}

          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800"
              >
                <time className="text-sm text-gray-400 dark:text-gray-500">
                  {post.date}
                </time>
                <h2 className="mt-1 text-lg font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
