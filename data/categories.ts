import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "3c",
    name: "3C 科技",
    description: "最新 3C 科技產品評測與推薦",
    icon: "Smartphone",
    children: [
      {
        slug: "earphones",
        name: "耳機",
        description: "藍牙耳機、有線耳機評測",
        icon: "Headphones",
      },
      {
        slug: "laptops",
        name: "筆電",
        description: "筆記型電腦評測與比較",
        icon: "Laptop",
      },
      {
        slug: "smartphones",
        name: "手機",
        description: "智慧型手機評測與比較",
        icon: "Smartphone",
      },
      {
        slug: "accessories",
        name: "配件",
        description: "3C 周邊配件推薦",
        icon: "Cable",
      },
      {
        slug: "drones",
        name: "空拍機",
        description: "空拍機、FPV 穿越機評測與比較",
        icon: "Plane",
      },
    ],
  },
  {
    slug: "lifestyle",
    name: "生活風格",
    description: "提升生活品質的好物推薦",
    icon: "Heart",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  for (const cat of categories) {
    if (cat.slug === slug) return cat;
    if (cat.children) {
      const child = cat.children.find((c) => c.slug === slug);
      if (child) return child;
    }
  }
  return undefined;
}

export function getAllCategorySlugs(): string[] {
  const slugs: string[] = [];
  for (const cat of categories) {
    slugs.push(cat.slug);
    if (cat.children) {
      for (const child of cat.children) {
        slugs.push(child.slug);
      }
    }
  }
  return slugs;
}
