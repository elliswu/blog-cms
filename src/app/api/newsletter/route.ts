import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

// POST /api/newsletter
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email 為必填欄位" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "請輸入有效的 Email 地址" }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ success: true, message: "訂閱成功（追蹤暫時停用）" });
    }

    const existing = db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .get();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ error: "此 Email 已經訂閱過囉！" }, { status: 409 });
      }
      db.update(newsletterSubscribers)
        .set({ status: "active" })
        .where(eq(newsletterSubscribers.email, email))
        .run();
      return NextResponse.json({ success: true, message: "重新訂閱成功" });
    }

    db.insert(newsletterSubscribers).values({ email }).run();
    return NextResponse.json({ success: true, message: "訂閱成功" });
  } catch {
    return NextResponse.json({ error: "訂閱失敗，請稍後再試" }, { status: 500 });
  }
}
