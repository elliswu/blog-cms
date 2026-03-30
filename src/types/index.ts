// ---- Category ----
export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  children?: Category[];
}

// ---- Blog / MDX Frontmatter ----
export interface BlogFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  keywords: string[];
  affiliateProducts?: string[];
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  coverImage?: string;
  author?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  readingTime?: number;
  content?: string;
}

// ---- Product ----
export interface AffiliateLink {
  platform: string; // momo | shopee | amazon | etc.
  url: string;
  price?: number;
  currency?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  coverImage: string;
  images?: string[];
  rating: number; // 0-5
  affiliateLinks: AffiliateLink[];
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
}

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ---- Site Config ----
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: string;
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  social: {
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  affiliateDisclosure: string;
}
