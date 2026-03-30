import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/../data/site-config";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: `${siteConfig.name} 的隱私權政策與資料使用說明。`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">隱私權政策</h1>
        <p className="text-sm text-muted-foreground">最後更新日期：2026 年 3 月 30 日</p>
      </header>

      <Separator />

      <div className="space-y-6 leading-7 text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">資料收集</h2>
          <p>
            {siteConfig.name} 會收集以下匿名資料以改善網站體驗：
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>頁面瀏覽記錄（文章與產品頁的瀏覽次數）</li>
            <li>搜尋關鍵字（用於優化搜尋功能）</li>
            <li>聯盟連結點擊記錄（用於分析推薦成效）</li>
          </ul>
          <p>我們不會收集任何可識別個人身份的資訊（如姓名、地址、電話等）。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">電子報訂閱</h2>
          <p>
            當您訂閱電子報時，我們會儲存您提供的 Email 地址。您可以隨時取消訂閱，我們會將您的狀態標記為「已取消」，不再寄送任何郵件。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Cookie 與追蹤技術</h2>
          <p>
            本站可能使用 Cookie 來記住您的偏好設定（例如深色/淺色模式）。我們不使用第三方追蹤 Cookie 進行跨站追蹤。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">聯盟行銷連結</h2>
          <p>
            本站部分連結為聯盟行銷連結。當您透過這些連結購買商品時，我們可能會獲得少許佣金，但這不會影響您的購買價格。我們會在相關文章中標示聯盟揭露聲明。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">第三方服務</h2>
          <p>本站可能使用以下第三方服務：</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Vercel — 網站託管與分析</li>
            <li>Google Analytics — 網站流量分析（如有啟用）</li>
          </ul>
          <p>這些服務可能會依照其各自的隱私權政策收集資料。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">政策變更</h2>
          <p>
            我們保留隨時修改本隱私權政策的權利。重大變更將於本頁面公告，並更新「最後更新日期」。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">聯絡方式</h2>
          <p>
            如對本隱私權政策有任何疑問，請聯繫：
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="ml-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {siteConfig.author.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
