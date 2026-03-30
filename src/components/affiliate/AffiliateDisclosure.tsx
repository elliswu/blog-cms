import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/../data/site-config";

interface AffiliateDisclosureProps {
  className?: string;
}

export function AffiliateDisclosure({ className }: AffiliateDisclosureProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200 ${className ?? ""}`}
    >
      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
      <p>{siteConfig.affiliateDisclosure}</p>
    </div>
  );
}
