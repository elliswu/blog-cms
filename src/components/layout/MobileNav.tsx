"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Smartphone, Headphones, Laptop, Heart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { mainNavItems } from "@/../data/navigation";
import { siteConfig } from "@/../data/site-config";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="size-4" />,
  Headphones: <Headphones className="size-4" />,
  Laptop: <Laptop className="size-4" />,
  Heart: <Heart className="size-4" />,
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-foreground md:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">開啟選單</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Smartphone className="size-5 text-primary" />
          <SheetTitle className="font-bold">{siteConfig.name}</SheetTitle>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {mainNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                    isActive ? "bg-accent text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 flex flex-col gap-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                          pathname === child.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {child.icon && iconMap[child.icon]}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
                <Separator className="my-1" />
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
