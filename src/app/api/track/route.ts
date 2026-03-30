import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { affiliateClicks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// POST /api/track — record an affiliate link click
export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, message: "DB not available" });
  }
  try {
    let body: Record<string, unknown>;

    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { error: "Invalid body" },
          { status: 400 }
        );
      }
    }

    const { productSlug, platform, sourceSlug, referrer } = body as {
      productSlug?: string;
      platform?: string;
      sourceSlug?: string;
      referrer?: string;
    };

    if (!productSlug || !platform) {
      return NextResponse.json(
        { error: "productSlug and platform are required" },
        { status: 400 }
      );
    }

    db.insert(affiliateClicks)
      .values({
        productSlug,
        platform,
        sourceSlug: sourceSlug ?? null,
        referrer: referrer ?? request.headers.get("referer") ?? null,
      })
      .run();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}

// GET /api/track?productSlug=xxx — get click stats
export async function GET(request: NextRequest) {
  if (!db) {
    return NextResponse.json([]);
  }
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get("productSlug");

    if (!productSlug) {
      const results = db
        .select({
          productSlug: affiliateClicks.productSlug,
          count: sql<number>`count(*)`.as("count"),
        })
        .from(affiliateClicks)
        .groupBy(affiliateClicks.productSlug)
        .orderBy(sql`count(*) DESC`)
        .limit(20)
        .all();

      return NextResponse.json(results);
    }

    const results = db
      .select({
        platform: affiliateClicks.platform,
        count: sql<number>`count(*)`.as("count"),
      })
      .from(affiliateClicks)
      .where(eq(affiliateClicks.productSlug, productSlug))
      .groupBy(affiliateClicks.platform)
      .all();

    return NextResponse.json({ productSlug, platforms: results });
  } catch {
    return NextResponse.json(
      { error: "Failed to get click stats" },
      { status: 500 }
    );
  }
}
