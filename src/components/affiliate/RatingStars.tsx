import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  size?: "sm" | "md";
}

export function RatingStars({
  rating,
  maxRating = 5,
  showValue = true,
  size = "md",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const extraFull = rating - fullStars >= 0.75 ? 1 : 0;
  const emptyStars = maxRating - fullStars - (hasHalf ? 1 : 0) - extraFull;

  const starSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars + extraFull }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSize} fill-amber-400 text-amber-400`}
          />
        ))}
        {hasHalf && (
          <StarHalf
            className={`${starSize} fill-amber-400 text-amber-400`}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${starSize} text-muted-foreground/30`}
          />
        ))}
      </div>
      {showValue && (
        <span
          className={`font-medium ${
            size === "sm" ? "text-xs" : "text-sm"
          } text-muted-foreground`}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
