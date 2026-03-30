import { Feed } from "feed";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/../data/site-config";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "zh-TW",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.author.url ?? siteConfig.url,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.publishedAt),
      image: post.coverImage
        ? `${siteConfig.url}${post.coverImage}`
        : undefined,
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
