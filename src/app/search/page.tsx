"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { SearchBar } from "@/components/common/SearchBar";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime?: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results ?? []);
        setSearched(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          搜尋文章
        </h1>
        <p className="mt-1 text-muted-foreground">
          輸入關鍵字搜尋所有文章內容
        </p>
      </div>

      <div className="max-w-md">
        <SearchBar defaultValue={query} />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          搜尋中...
        </div>
      )}

      {searched && !loading && (
        <p className="text-sm text-muted-foreground">
          找到 {results.length} 篇相關文章
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result) => (
            <a
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <h2 className="font-semibold hover:text-primary">
                {result.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {result.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {result.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground">
                  {new Date(result.publishedAt).toLocaleDateString("zh-TW")}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">
            找不到符合「{query}」的文章，請嘗試其他關鍵字。
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2 py-10 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          載入中...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
