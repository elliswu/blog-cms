import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 文章瀏覽追蹤
export const pageViews = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(),
  type: text("type").notNull().default("blog"), // blog | product
  viewedAt: text("viewed_at").default(sql`CURRENT_TIMESTAMP`),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
});

// 聯盟連結點擊追蹤
export const affiliateClicks = sqliteTable("affiliate_clicks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productSlug: text("product_slug").notNull(),
  platform: text("platform").notNull(),
  sourceSlug: text("source_slug"),
  clickedAt: text("clicked_at").default(sql`CURRENT_TIMESTAMP`),
  referrer: text("referrer"),
});

// 搜尋記錄
export const searchLogs = sqliteTable("search_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  query: text("query").notNull(),
  resultsCount: integer("results_count").default(0),
  searchedAt: text("searched_at").default(sql`CURRENT_TIMESTAMP`),
});

// 電子報訂閱
export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  subscribedAt: text("subscribed_at").default(sql`CURRENT_TIMESTAMP`),
  status: text("status").default("active"), // active | unsubscribed
});
