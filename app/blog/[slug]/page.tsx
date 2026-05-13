import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { BlogLayout, BackLink } from "@/components/blog/BlogLayout";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <BlogLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline dark:text-blue-400">
            Back to Blog
          </Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="px-6 py-24">
        <article className="mx-auto max-w-3xl">
          <BackLink href="/blog" label="Back to Blog" />

          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full rounded-lg mb-8"
            />
          )}

          <header>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <time>{post.date}</time>
              {post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          <div
            className="mt-8 prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.originalUrl && (
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6">
              <a
                href={post.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                View original article →
              </a>
            </div>
          )}
        </article>
      </div>
    </BlogLayout>
  );
}
