"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-8" />;

  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <button
      onClick={() => setTheme(next)}
      className="inline-flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
      aria-label={`切換為${next === "dark" ? "深色" : next === "light" ? "淺色" : "系統"}模式`}
    >
      <Icon className="size-4" />
    </button>
  );
}
