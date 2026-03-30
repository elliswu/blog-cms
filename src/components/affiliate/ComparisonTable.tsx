import { RatingStars } from "@/components/affiliate/RatingStars";
import { PriceTag } from "@/components/affiliate/PriceTag";
import { CTAButton } from "@/components/affiliate/CTAButton";
import { getCheapestLink } from "@/lib/affiliate-utils";
import type { Product } from "@/types";
import Link from "next/link";

interface ComparisonTableProps {
  products: Product[];
  specs?: string[];
  sourceSlug?: string;
}

export function ComparisonTable({
  products,
  specs,
  sourceSlug,
}: ComparisonTableProps) {
  if (products.length === 0) return null;

  // Collect all unique spec labels or use provided list
  const specLabels =
    specs ??
    Array.from(
      new Set(products.flatMap((p) => p.specs.map((s) => s.label)))
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold">項目</th>
            {products.map((p) => (
              <th key={p.slug} className="px-4 py-3 text-center font-semibold">
                <Link
                  href={`/products/${p.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {p.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Rating row */}
          <tr className="border-b border-border">
            <td className="px-4 py-2.5 font-medium">評分</td>
            {products.map((p) => (
              <td key={p.slug} className="px-4 py-2.5 text-center">
                <div className="flex justify-center">
                  <RatingStars rating={p.rating} size="sm" />
                </div>
              </td>
            ))}
          </tr>

          {/* Price row */}
          <tr className="border-b border-border">
            <td className="px-4 py-2.5 font-medium">最低價格</td>
            {products.map((p) => {
              const cheapest = getCheapestLink(p);
              return (
                <td key={p.slug} className="px-4 py-2.5 text-center">
                  {cheapest?.price ? (
                    <div className="flex justify-center">
                      <PriceTag
                        price={cheapest.price}
                        currency={cheapest.currency}
                        size="sm"
                      />
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              );
            })}
          </tr>

          {/* Spec rows */}
          {specLabels.map((label) => (
            <tr key={label} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5 font-medium">{label}</td>
              {products.map((p) => {
                const spec = p.specs.find((s) => s.label === label);
                return (
                  <td
                    key={p.slug}
                    className="px-4 py-2.5 text-center text-muted-foreground"
                  >
                    {spec?.value ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* CTA row */}
          <tr className="bg-muted/30">
            <td className="px-4 py-3 font-medium">購買連結</td>
            {products.map((p) => {
              const cheapest = getCheapestLink(p);
              return (
                <td key={p.slug} className="px-4 py-3 text-center">
                  {cheapest && (
                    <CTAButton
                      href={cheapest.url}
                      platform={cheapest.platform}
                      productSlug={p.slug}
                      sourceSlug={sourceSlug}
                      label="查看價格"
                      variant="outline"
                    />
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
