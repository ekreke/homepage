import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import path from "path";
import { blogSources } from "@/config/blog-sources";

export interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string;
  originalUrl: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const INDEX_JSON_PATH = path.join(CONTENT_DIR, "index.json");
const CACHE_TTL = 3600 * 1000;
const CACHE_ENABLED = process.env.NODE_ENV === "production" || process.env.BLOG_CACHE === "true";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function extractExcerpt(html: string, maxLen = 200): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

function parseFrontmatter(fileContent: string): { data: Record<string, unknown>; body: string } {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: fileContent };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  }

  return { data, body: match[2].trim() };
}

function toFrontmatter(post: Post): string {
  return [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    `slug: ${JSON.stringify(post.slug)}`,
    `date: ${JSON.stringify(post.date)}`,
    `excerpt: ${JSON.stringify(post.excerpt)}`,
    `tags: ${JSON.stringify(post.tags)}`,
    `coverImage: ${JSON.stringify(post.coverImage)}`,
    `originalUrl: ${JSON.stringify(post.originalUrl)}`,
    "---",
    "",
    post.content,
  ].join("\n");
}

async function fetchRSSFeed(): Promise<Post[]> {
  const rssSource = blogSources.find((s) => s.type === "rss");
  if (!rssSource?.endpoint) return [];

  const res = await fetch(rssSource.endpoint, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

  const xml = await res.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const parsed = parser.parse(xml);

  const items = parsed?.rss?.channel?.item ?? [];
  const feed = Array.isArray(items) ? items : [items];

  return feed.map((item: Record<string, unknown>) => {
    const title = String(item.title ?? "");
    const slug = slugify(title);
    const date = String(item.pubDate ?? "").split("T")[0].split(" ")[0];
    const content = String(item["content:encoded"] ?? item.content ?? item.description ?? "");
    const link = String(item.link ?? "");
    const mediaContent = item["media:content"] as Record<string, string> | undefined;
    const mediaThumbnail = item["media:thumbnail"] as Record<string, string> | undefined;
    const enclosure = item.enclosure as Record<string, string> | undefined;
    const coverImage = String(
      mediaContent?.["@_url"] ?? mediaThumbnail?.["@_url"] ?? enclosure?.["@_url"] ?? ""
    );

    const categories = item.category;
    const tags: string[] = Array.isArray(categories)
      ? categories.map(String)
      : categories
        ? [String(categories)]
        : [];

    return {
      title,
      slug,
      date,
      excerpt: extractExcerpt(content),
      content,
      tags,
      coverImage,
      originalUrl: link,
    };
  });
}

function writeCache(posts: Post[]): void {
  if (!CACHE_ENABLED) return;

  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  for (const post of posts) {
    const filePath = path.join(CONTENT_DIR, `${post.slug}.md`);
    fs.writeFileSync(filePath, toFrontmatter(post), "utf-8");
  }

  const index = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    coverImage: post.coverImage,
    originalUrl: post.originalUrl,
  }));
  const payload = { updatedAt: Date.now(), posts: index };
  fs.writeFileSync(INDEX_JSON_PATH, JSON.stringify(payload, null, 2), "utf-8");
}

function readCachedIndex(): Post[] | null {
  if (!CACHE_ENABLED) return null;
  try {
    if (!fs.existsSync(INDEX_JSON_PATH)) return null;
    const raw = fs.readFileSync(INDEX_JSON_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    const posts = Array.isArray(parsed) ? parsed : parsed.posts;
    if (!Array.isArray(posts) || posts.length === 0) return null;
    const updatedAt: number = Array.isArray(parsed) ? 0 : (parsed.updatedAt ?? 0);
    if (updatedAt && Date.now() - updatedAt > CACHE_TTL) return null;
    return posts as Post[];
  } catch {
    return null;
  }
}

function readCachedPost(slug: string): Post | null {
  if (!CACHE_ENABLED) return null;
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, body } = parseFrontmatter(raw);
    return {
      title: String(data.title ?? ""),
      slug: String(data.slug ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      content: body,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      coverImage: String(data.coverImage ?? ""),
      originalUrl: String(data.originalUrl ?? ""),
    };
  } catch {
    return null;
  }
}

export async function fetchAndCachePosts(): Promise<Post[]> {
  try {
    const posts = await fetchRSSFeed();
    writeCache(posts);
    return posts;
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const cached = readCachedIndex();
  if (cached && cached.length > 0) {
    return cached;
  }

  return await fetchAndCachePosts();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const cached = readCachedPost(slug);
  if (cached) return cached;

  const posts = await fetchAndCachePosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
