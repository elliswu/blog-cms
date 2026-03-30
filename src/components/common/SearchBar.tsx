"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
}

export function SearchBar({ defaultValue = "", compact = false }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="搜尋文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`pl-9 ${compact ? "h-8 text-sm" : "h-10"}`}
      />
    </form>
  );
}
