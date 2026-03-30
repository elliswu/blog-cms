import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pageViews } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

// POST /api/views — record a page view
export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, message: "DB not available" });
  }
  try {
    const body = await request.json();
    const { slug, type = "blog" } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const referrer = request.headers.get("referer") ?? undefined;
    const userAgent = request.headers.get("user-agent") ?? undefined;

    db.insert(pageViews)
      .values({ slug, type, referrer, userAgent })
      .run();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}

// GET /api/views?slug=xxx — get view count for a page
export async function GET(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ slug: "", type: "blog", count: 0 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      const results = db
        .select({
          slug: pageViews.slug,
          type: pageViews.type,
          count: sql<number>`count(*)`.as("count"),
        })
        .from(pageViews)
        .groupBy(pageViews.slug, pageViews.type)
        .orderBy(sql`count(*) DESC`)
        .limit(20)
        .all();

      return NextResponse.json(results);
    }

    const type = searchParams.get("type") ?? "blog";

    const result = db
      .select({
        count: sql<number>`count(*)`.as("count"),
      })
      .from(pageViews)
      .where(and(eq(pageViews.slug, slug), eq(pageViews.type, type)))
      .get();

    return NextResponse.json({ slug, type, count: result?.count ?? 0 });
  } catch {
    return NextResponse.json(
      { error: "Failed to get views" },
      { status: 500 }
    );
  }
}
