import { SiteConfig } from "@/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techpick.blog";

export const siteConfig: SiteConfig = {
  name: "TechPick 科技選物",
  description:
    "精選 3C 科技產品評測與推薦，幫你找到最適合的科技好物。",
  url: siteUrl,
  locale: "zh-TW",
  author: {
    name: "TechPick",
    email: "hello@techpick.blog",
  },
  social: {
    twitter: "",
    github: "",
    facebook: "",
    instagram: "",
  },
  affiliateDisclosure:
    "本站部分連結為聯盟行銷連結，透過這些連結購買商品，我們將獲得少許佣金，但不影響您的購買價格。感謝您的支持！",
};
