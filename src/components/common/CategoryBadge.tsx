import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getCategoryBySlug } from "@/../data/categories";

interface CategoryBadgeProps {
  slug: string;
  linked?: boolean;
}

export function CategoryBadge({ slug, linked = true }: CategoryBadgeProps) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const badge = (
    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
      {category.name}
    </Badge>
  );

  if (linked) {
    return <Link href={`/blog/category/${slug}`}>{badge}</Link>;
  }

  return badge;
}
