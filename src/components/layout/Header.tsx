"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Smartphone,
  Headphones,
  Laptop,
  Heart,
  ChevronDown,
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/../data/site-config";
import { mainNavItems } from "@/../data/navigation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="size-4" />,
  Headphones: <Headphones className="size-4" />,
  Laptop: <Laptop className="size-4" />,
  Heart: <Heart className="size-4" />,
};

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold">
          <Smartphone className="size-5 text-primary" />
          <span className="hidden sm:inline-block">{siteConfig.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {mainNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.children) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                  {openDropdown === item.href && (
                    <div className="absolute left-0 top-full z-50 min-w-[180px] rounded-md border border-border bg-popover p-1 shadow-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {child.icon && iconMap[child.icon]}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end gap-1">
          <Link
            href="/search"
            aria-label="搜尋"
            className="inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="size-4" />
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
