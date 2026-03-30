import Link from "next/link";
import { TrendingUp, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/../data/categories";
import { Badge } from "@/components/ui/badge";
import { getFeaturedPosts } from "@/lib/mdx";
import { getFeaturedProducts } from "@/lib/affiliate";
import { Newsletter } from "@/components/common/Newsletter";

export function Sidebar() {
  const featuredPosts = getFeaturedPosts().slice(0, 5);
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-20 space-y-6">
        {/* Popular Articles */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-primary" />
            熱門文章
          </h3>
          <Separator className="mb-3" />
          {featuredPosts.length > 0 ? (
            <ul className="space-y-2.5">
              {featuredPosts.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-2 text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">尚無文章</p>
          )}
        </div>

        {/* Categories */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Package className="size-4 text-primary" />
            文章分類
          </h3>
          <Separator className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/blog/category/${cat.slug}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                  {cat.name}
                </Badge>
              </Link>
            ))}
            {categories
              .flatMap((cat) => cat.children ?? [])
              .map((child) => (
                <Link key={child.slug} href={`/blog/category/${child.slug}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                  >
                    {child.name}
                  </Badge>
                </Link>
              ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Package className="size-4 text-primary" />
            推薦產品
          </h3>
          <Separator className="mb-3" />
          {featuredProducts.length > 0 ? (
            <ul className="space-y-2.5">
              {featuredProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block text-sm"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {product.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {product.brand}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">敬請期待</p>
          )}
        </div>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </aside>
  );
}
