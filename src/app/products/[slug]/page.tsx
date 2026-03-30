import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getProductBySlug,
  getAllProductSlugs,
  formatPrice,
  platformNames,
} from "@/lib/affiliate";
import { JsonLd } from "@/components/seo/JsonLd";
import { RatingStars } from "@/components/affiliate/RatingStars";
import { PriceTag } from "@/components/affiliate/PriceTag";
import { ProsConsList } from "@/components/affiliate/ProsConsList";
import { CTAButton } from "@/components/affiliate/CTAButton";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { TagList } from "@/components/common/TagList";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — 產品評測`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "article",
      images: product.coverImage ? [product.coverImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <JsonLd type="product" data={product} />
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "首頁", url: "/" },
          { name: "產品推薦", url: "/products" },
          { name: product.name, url: `/products/${slug}` },
        ]}
      />
      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        返回產品列表
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
          </div>
          {product.featured && (
            <Badge className="bg-primary/10 text-primary">推薦</Badge>
          )}
        </div>
        <RatingStars rating={product.rating} />
        <p className="text-muted-foreground">{product.description}</p>
      </header>

      <AffiliateDisclosure />

      <Separator />

      {/* Pricing & Buy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">價格比較</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {product.affiliateLinks.map((link) => (
            <div
              key={link.platform}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <span className="text-sm font-medium">
                {platformNames[link.platform] ?? link.platform}
              </span>
              {link.price && (
                <PriceTag price={link.price} currency={link.currency} />
              )}
              <CTAButton
                href={link.url}
                platform={link.platform}
                productSlug={product.slug}
                label="前往購買"
                variant="primary"
              />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Pros & Cons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">優缺點分析</h2>
        <ProsConsList pros={product.pros} cons={product.cons} />
      </section>

      <Separator />

      {/* Specs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">規格表</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {product.specs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={
                    i % 2 === 0 ? "bg-muted/30" : "bg-background"
                  }
                >
                  <td className="px-4 py-2.5 font-medium w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Tags */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">標籤</h3>
        <TagList tags={product.tags} />
      </section>
    </div>
  );
}
