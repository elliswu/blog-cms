import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogFrontmatter } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function parseMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const slug = path.basename(filePath, ".mdx");
  const stats = readingTime(content);

  return {
    ...fm,
    slug,
    readingTime: Math.ceil(stats.minutes),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseMdxFile(path.join(BLOG_DIR, f)))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseMdxFile(filePath);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Score by shared category + shared tags
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 3;
    const sharedTags = post.tags.filter((t) => current.tags.includes(t));
    score += sharedTags.length;
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Extract headings from markdown content for TOC */
export function extractHeadings(
  content: string
): { depth: number; text: string; id: string }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { depth: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ depth: match[1].length, text, id });
  }

  return headings;
}
