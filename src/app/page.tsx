import Link from "next/link";
import { ArrowRight, Smartphone, Headphones } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { siteConfig } from "@/../data/site-config";
import { categories } from "@/../data/categories";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/mdx";
import { ArticleCard } from "@/components/blog/ArticleCard";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 4);
  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 space-y-10">
        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              瀏覽文章 <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
            >
              產品推薦
            </Link>
          </div>
        </section>

        {/* Categories showcase */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">探索分類</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {cat.slug === "3c" ? (
                      <Smartphone className="size-5" />
                    ) : (
                      <Headphones className="size-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-accent-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>
                {cat.children && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cat.children.map((child) => (
                      <Badge key={child.slug} variant="secondary" className="text-xs">
                        {child.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Latest articles */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              查看全部 →
            </Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {latestPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">
                文章即將上線，敬請期待！
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
