import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";
import { db } from "@/lib/db";
import { searchLogs } from "@/db/schema";

// GET /api/search?q=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json({ results: [], query: "" });
    }

    const allPosts = getAllPosts();
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const scored = allPosts
      .map((post) => {
        const titleLower = post.title.toLowerCase();
        const descLower = post.description.toLowerCase();
        const contentLower = (post.content ?? "").toLowerCase();
        const tagsLower = post.tags.map((t) => t.toLowerCase());

        let score = 0;
        for (const term of terms) {
          if (titleLower.includes(term)) score += 10;
          if (descLower.includes(term)) score += 5;
          if (tagsLower.some((t) => t.includes(term))) score += 3;
          if (contentLower.includes(term)) score += 1;
        }
        return { post, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    const results = scored.map(({ post }) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      tags: post.tags,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
    }));

    try {
      if (db) {
        db.insert(searchLogs).values({ query, resultsCount: results.length }).run();
      }
    } catch {
      // non-critical
    }

    return NextResponse.json({ results, query, total: results.length });
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
