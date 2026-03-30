"use client";

import { ExternalLink } from "lucide-react";
import { platformNames } from "@/lib/affiliate-utils";

interface CTAButtonProps {
  href: string;
  platform: string;
  productSlug: string;
  sourceSlug?: string;
  label?: string;
  variant?: "primary" | "outline";
}

export function CTAButton({
  href,
  platform,
  productSlug,
  sourceSlug,
  label,
  variant = "primary",
}: CTAButtonProps) {
  const displayName = platformNames[platform] ?? platform;
  const buttonLabel = label ?? `前往 ${displayName} 購買`;

  const handleClick = () => {
    // Client-side tracking — fire-and-forget POST to track API (Phase 4)
    if (typeof window !== "undefined") {
      navigator.sendBeacon?.(
        "/api/track",
        JSON.stringify({
          productSlug,
          platform,
          sourceSlug,
          referrer: window.location.pathname,
        })
      );
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {buttonLabel}
      <ExternalLink className="size-3.5" />
    </a>
  );
}
