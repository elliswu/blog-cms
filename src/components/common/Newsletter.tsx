"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("訂閱成功！感謝您的支持 🎉");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "訂閱失敗，請稍後再試");
      }
    } catch {
      setStatus("error");
      setMessage("網路錯誤，請稍後再試");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
        <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
          <CheckCircle className="size-4" />
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold">
        <Mail className="size-4 text-primary" />
        訂閱電子報
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        每週收到最新科技好物推薦，不錯過任何優惠資訊。
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-8 text-sm"
        />
        <Button type="submit" disabled={status === "loading"} className="h-8 shrink-0 px-3 text-sm">
          {status === "loading" ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            "訂閱"
          )}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{message}</p>
      )}
    </div>
  );
}
