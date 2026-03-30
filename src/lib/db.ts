import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "@/db/schema";
import path from "path";
import fs from "fs";

const isVercel = process.env.VERCEL === "1";

function getDbPath() {
  if (isVercel) {
    return path.join("/tmp", "blog.db");
  }
  return path.join(process.cwd(), "data", "blog.db");
}

let db: BetterSQLite3Database<typeof schema> | null = null;
let sqlite: InstanceType<typeof Database> | null = null;

try {
  const DB_PATH = getDbPath();
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'blog',
      viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      referrer TEXT,
      user_agent TEXT
    );

    CREATE TABLE IF NOT EXISTS affiliate_clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_slug TEXT NOT NULL,
      platform TEXT NOT NULL,
      source_slug TEXT,
      clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      referrer TEXT
    );

    CREATE TABLE IF NOT EXISTS search_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      results_count INTEGER DEFAULT 0,
      searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'active'
    );

    CREATE INDEX IF NOT EXISTS idx_page_views_slug ON page_views(slug);
    CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_product ON affiliate_clicks(product_slug);
    CREATE INDEX IF NOT EXISTS idx_search_logs_query ON search_logs(query);
  `);

  db = drizzle(sqlite, { schema });
} catch (e) {
  console.warn("⚠️ SQLite initialization failed (expected on Vercel):", e);
  db = null;
  sqlite = null;
}

export { db, sqlite };
