import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { Product } from "@/types";

export { getCheapestLink, formatPrice, platformNames } from "@/lib/affiliate-utils";

const PRODUCTS_DIR = path.join(process.cwd(), "content/products");

function parseProductFile(filePath: string): Product {
  const raw = fs.readFileSync(filePath, "utf-8");
  return yaml.load(raw) as Product;
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];

  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
    .map((f) => parseProductFile(path.join(PRODUCTS_DIR, f)))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getAllProductSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}
