import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
}

export function ProsConsList({ pros, cons }: ProsConsListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Pros */}
      <div className="rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
          <ThumbsUp className="size-4" />
          優點
        </h4>
        <ul className="space-y-1.5">
          {pros.map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300"
            >
              <span className="mt-0.5 text-green-500">✓</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
          <ThumbsDown className="size-4" />
          缺點
        </h4>
        <ul className="space-y-1.5">
          {cons.map((con, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300"
            >
              <span className="mt-0.5 text-red-500">✗</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
