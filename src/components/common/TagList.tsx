import { Badge } from "@/components/ui/badge";

interface TagListProps {
  tags: string[];
  limit?: number;
}

export function TagList({ tags, limit }: TagListProps) {
  const displayed = limit ? tags.slice(0, limit) : tags;

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayed.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs font-normal">
          {tag}
        </Badge>
      ))}
      {limit && tags.length > limit && (
        <span className="text-xs text-muted-foreground">
          +{tags.length - limit}
        </span>
      )}
    </div>
  );
}
