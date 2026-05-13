import { getPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return Response.json({ post: null }, { status: 404 });
  }

  return Response.json({ post });
}
