import Link from "next/link";
import { Smartphone, Rss } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/../data/site-config";
import { footerNavItems } from "@/../data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Smartphone className="size-5 text-primary" />
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">快速連結</h3>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliate Disclosure */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">聯盟揭露</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {siteConfig.affiliateDisclosure}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/feed.xml" className="flex items-center gap-1 hover:text-foreground" aria-label="RSS Feed">
              <Rss className="size-3" /> RSS
            </Link>
            <span>&middot;</span>
            <span>Built with <Link href="https://nextjs.org" className="underline underline-offset-2 hover:text-foreground" target="_blank" rel="noopener noreferrer">Next.js</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
