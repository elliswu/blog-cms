import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "首頁", href: "/" },
  {
    label: "文章",
    href: "/blog",
    children: [
      { label: "全部文章", href: "/blog" },
      { label: "3C 科技", href: "/blog/category/3c", icon: "Smartphone" },
      { label: "耳機", href: "/blog/category/earphones", icon: "Headphones" },
      { label: "筆電", href: "/blog/category/laptops", icon: "Laptop" },
      { label: "手機", href: "/blog/category/smartphones", icon: "Smartphone" },
      { label: "生活風格", href: "/blog/category/lifestyle", icon: "Heart" },
    ],
  },
  { label: "產品推薦", href: "/products" },
  { label: "關於我", href: "/about" },
];

export const footerNavItems: NavItem[] = [
  { label: "首頁", href: "/" },
  { label: "文章", href: "/blog" },
  { label: "產品推薦", href: "/products" },
  { label: "關於我", href: "/about" },
  { label: "隱私權政策", href: "/privacy" },
];
