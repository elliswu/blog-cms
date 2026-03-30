import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types";
import { getCategoryBySlug } from "@/../data/categories";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const category = getCategoryBySlug(post.category);

  return (
    <article
      className={`group rounded-lg border border-border bg-card transition-colors hover:bg-accent/50 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block p-5">
        <div className="space-y-3">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            )}
            {featured && (
              <Badge className="bg-primary/10 text-primary text-xs">
                精選
              </Badge>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-semibold leading-snug group-hover:text-primary transition-colors ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readingTime} 分鐘閱讀
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read more */}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            閱讀更多 <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
