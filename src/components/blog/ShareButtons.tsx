"use client";

import { Share2, ExternalLink, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-sm text-muted-foreground">
        <Share2 className="size-3.5" />
        分享
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-colors hover:bg-muted"
        aria-label="分享到 X"
      >
        𝕏
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-colors hover:bg-muted"
        aria-label="分享到 Facebook"
      >
        <ExternalLink className="size-4" />
      </a>
      <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
        <LinkIcon className="size-4" />
        <span className="sr-only">複製連結</span>
      </Button>
    </div>
  );
}
