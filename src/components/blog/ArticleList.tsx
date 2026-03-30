import { ArticleCard } from "@/components/blog/ArticleCard";
import type { BlogPost } from "@/types";

interface ArticleListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export function ArticleList({ posts, showFeatured = false }: ArticleListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground">目前沒有文章</p>
      </div>
    );
  }

  const featured = showFeatured ? posts.filter((p) => p.featured) : [];
  const regular = showFeatured
    ? posts.filter((p) => !p.featured)
    : posts;

  return (
    <div className="space-y-6">
      {/* Featured posts */}
      {featured.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((post) => (
            <ArticleCard key={post.slug} post={post} featured />
          ))}
        </div>
      )}

      {/* Regular posts */}
      <div className="grid gap-4 sm:grid-cols-2">
        {regular.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
