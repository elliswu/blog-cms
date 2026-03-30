import Link from "next/link";
import { RatingStars } from "@/components/affiliate/RatingStars";
import { PriceTag } from "@/components/affiliate/PriceTag";
import { CTAButton } from "@/components/affiliate/CTAButton";
import { getCheapestLink } from "@/lib/affiliate-utils";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  sourceSlug?: string;
  compact?: boolean;
}

export function ProductCard({
  product,
  sourceSlug,
  compact = false,
}: ProductCardProps) {
  const cheapest = getCheapestLink(product);

  if (compact) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="mt-1">
            <RatingStars rating={product.rating} size="sm" />
          </div>
        </div>
        {cheapest?.price && (
          <PriceTag
            price={cheapest.price}
            currency={cheapest.currency}
            size="sm"
          />
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/products/${product.slug}`}
                className="text-lg font-semibold hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            {product.featured && (
              <Badge className="bg-primary/10 text-primary text-xs shrink-0">
                推薦
              </Badge>
            )}
          </div>
          <RatingStars rating={product.rating} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        {cheapest?.price && (
          <PriceTag
            price={cheapest.price}
            currency={cheapest.currency}
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-2">
          {cheapest && (
            <CTAButton
              href={cheapest.url}
              platform={cheapest.platform}
              productSlug={product.slug}
              sourceSlug={sourceSlug}
            />
          )}
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
          >
            查看詳情
          </Link>
        </div>
      </div>
    </div>
  );
}
