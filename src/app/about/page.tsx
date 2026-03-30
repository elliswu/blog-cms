import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/../data/site-config";

export const metadata: Metadata = {
  title: "關於我",
  description: `關於 ${siteConfig.name} — 我們的故事與理念。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">關於 {siteConfig.name}</h1>
        <p className="text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </header>

      <Separator />

      <section className="space-y-4 leading-7 text-foreground/90">
        <h2 className="text-xl font-semibold">我們的理念</h2>
        <p>
          在資訊爆炸的時代，選購科技產品往往令人眼花撩亂。{siteConfig.name}{" "}
          的使命是透過深度評測與真實體驗，幫助每位讀者找到最適合自己的科技好物。
        </p>
        <p>
          我們堅持以使用者角度出發，提供客觀、詳盡的產品分析。不論是耳機、筆電、手機還是各種配件，我們都會親自測試後才撰寫推薦文章。
        </p>
      </section>

      <section className="space-y-4 leading-7 text-foreground/90">
        <h2 className="text-xl font-semibold">內容涵蓋</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>🎧 耳機評測 — 藍牙耳機、降噪耳機、有線耳機</li>
          <li>💻 筆電比較 — MacBook、Windows 筆電</li>
          <li>📱 手機推薦 — iPhone、Android 旗艦</li>
          <li>🔌 配件精選 — 充電器、保護殼、鍵盤滑鼠</li>
        </ul>
      </section>

      <section className="space-y-4 leading-7 text-foreground/90">
        <h2 className="text-xl font-semibold">聯盟行銷揭露</h2>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          {siteConfig.affiliateDisclosure}
        </div>
      </section>

      <section className="space-y-4 leading-7 text-foreground/90">
        <h2 className="text-xl font-semibold">聯絡我們</h2>
        <p>
          有任何問題、合作邀約或產品推薦需求，歡迎來信：
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="ml-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {siteConfig.author.email}
          </a>
        </p>
      </section>
    </div>
  );
}
