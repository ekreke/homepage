import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllPosts();
  const summary = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    coverImage: post.coverImage,
    originalUrl: post.originalUrl,
  }));
  return Response.json({ posts: summary });
}
