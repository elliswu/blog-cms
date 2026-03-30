import { formatPrice } from "@/lib/affiliate-utils";

interface PriceTagProps {
  price: number;
  currency?: string;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({
  price,
  currency = "TWD",
  originalPrice,
  size = "md",
}: PriceTagProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const discount =
    originalPrice && originalPrice > price
      ? Math.round((1 - price / originalPrice) * 100)
      : null;

  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-bold text-primary ${sizeClasses[size]}`}>
        {formatPrice(price, currency)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(originalPrice, currency)}
        </span>
      )}
      {discount && (
        <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
          -{discount}%
        </span>
      )}
    </div>
  );
}
