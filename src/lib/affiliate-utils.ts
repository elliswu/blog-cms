import type { Product } from "@/types";

/** Get cheapest affiliate link for a product */
export function getCheapestLink(product: Product) {
  const twdLinks = product.affiliateLinks.filter(
    (l) => l.currency === "TWD" && l.price
  );
  if (twdLinks.length === 0) return product.affiliateLinks[0];
  return twdLinks.reduce((min, l) =>
    (l.price ?? Infinity) < (min.price ?? Infinity) ? l : min
  );
}

/** Format price with currency */
export function formatPrice(price: number, currency = "TWD"): string {
  if (currency === "TWD") return `NT$${price.toLocaleString()}`;
  if (currency === "USD") return `US$${price}`;
  return `${currency} ${price}`;
}

/** Platform display names */
export const platformNames: Record<string, string> = {
  momo: "momo 購物網",
  shopee: "蝦皮購物",
  amazon: "Amazon",
  "affiliates-one": "聯盟網",
  books: "博客來",
};
