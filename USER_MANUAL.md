# TechPick 科技選物 — 使用手冊

## 新增文章

在 `content/blog/` 目錄下新增一個 `.mdx` 檔案即可。檔名即為文章的 URL slug。

例如新增 `content/blog/my-new-article.mdx`，文章網址就會是 `/blog/my-new-article`。

### 文章模板

```mdx
---
title: "你的文章標題"
description: "文章簡短描述，會顯示在列表頁和 SEO meta"
category: "earphones"
tags: ["標籤1", "標籤2"]
keywords: ["SEO關鍵字1", "SEO關鍵字2"]
affiliateProducts: []
publishedAt: "2026-03-30"
featured: false
coverImage: "/images/blog/your-image.jpg"
author: "TechPick"
---

## 第一段標題

文章內容用 Markdown 語法撰寫...

### 子標題

- 列表項目
- **粗體**、*斜體*

> 引用區塊

| 欄位 | 值 |
|------|-----|
| A    | B   |
```

### Frontmatter 欄位說明

| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | 文章標題 |
| `description` | ✅ | 簡短描述，用於列表卡片與 SEO meta description |
| `category` | ✅ | 分類 slug（見下方分類列表） |
| `tags` | ✅ | 標籤陣列，用於相關文章推薦與搜尋 |
| `keywords` | ✅ | SEO 關鍵字陣列 |
| `affiliateProducts` | 否 | 產品 slug 陣列，有填則自動顯示聯盟揭露聲明 |
| `publishedAt` | ✅ | 發布日期（格式：`YYYY-MM-DD`） |
| `updatedAt` | 否 | 更新日期 |
| `featured` | 否 | 設為 `true` 會出現在首頁精選區與側邊欄熱門文章 |
| `coverImage` | 否 | 封面圖片路徑（放在 `public/images/blog/`） |
| `author` | 否 | 作者名稱 |

### 可用分類（category）

| Slug | 名稱 |
|------|------|
| `3c` | 3C 科技 |
| `earphones` | 耳機 |
| `laptops` | 筆電 |
| `smartphones` | 手機 |
| `accessories` | 配件 |
| `lifestyle` | 生活風格 |

新增分類請編輯 `data/categories.ts`。

### 在文章中嵌入聯盟元件

MDX 支援直接在文章內使用 React 元件：

```mdx
## 產品推薦

<ProductCard slug="sony-wh1000xm6" />

## 產品比較

<ComparisonTable slugs={["sony-wh1000xm6", "airpods-pro-3"]} />

## 優缺點

<ProsConsList
  pros={["音質好", "降噪強"]}
  cons={["價格高", "偏重"]}
/>

## 評分

<RatingStars rating={4.5} />

## 聯盟揭露

<AffiliateDisclosure />
```

---

## 新增產品

在 `content/products/` 目錄下新增一個 `.yaml` 檔案。

### 產品模板

```yaml
slug: product-slug-name
name: "產品名稱"
brand: "品牌"
category: "earphones"
description: "產品簡短描述"
coverImage: "/images/products/product-image.jpg"
rating: 4.5
affiliateLinks:
  - platform: "momo"
    url: "https://www.momoshop.com.tw/goods/..."
    price: 9900
    currency: "TWD"
  - platform: "shopee"
    url: "https://shopee.tw/..."
    price: 9500
    currency: "TWD"
specs:
  - label: "類型"
    value: "頭戴式降噪耳機"
  - label: "續航"
    value: "30 小時"
pros:
  - "優點 1"
  - "優點 2"
cons:
  - "缺點 1"
  - "缺點 2"
tags: ["標籤1", "標籤2"]
publishedAt: "2026-03-30"
featured: false
```

### 可用聯盟平台（platform）

| 代碼 | 顯示名稱 |
|------|----------|
| `momo` | momo 購物網 |
| `shopee` | 蝦皮購物 |
| `amazon` | Amazon |
| `affiliates-one` | 聯盟網 |
| `books` | 博客來 |

新增平台請編輯 `src/lib/affiliate-utils.ts` 中的 `platformNames`。

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器（支援 hot-reload）
npm run build    # 建置生產版本（含 sitemap 自動生成）
npm run start    # 啟動生產伺服器
npm run lint     # 執行 ESLint 檢查
```
