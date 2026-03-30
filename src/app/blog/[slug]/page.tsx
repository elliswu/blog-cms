import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug, getAllSlugs, getRelatedPosts, extractHeadings } from "@/lib/mdx";
import { getProductBySlug } from "@/lib/affiliate";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { TagList } from "@/components/common/TagList";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { ComparisonTable } from "@/components/affiliate/ComparisonTable";
import { ProsConsList } from "@/components/affiliate/ProsConsList";
import { RatingStars } from "@/components/affiliate/RatingStars";
import { PriceTag } from "@/components/affiliate/PriceTag";
import { CTAButton } from "@/components/affiliate/CTAButton";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/../data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 leading-7 text-foreground/90" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mb-4 border-l-4 border-primary/30 bg-muted/50 py-2 pl-4 italic"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border border-border bg-muted px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
  hr: () => <Separator className="my-8" />,
  // Affiliate components available in MDX
  ProductCard: ({ slug, sourceSlug }: { slug: string; sourceSlug?: string }) => {
    const product = getProductBySlug(slug);
    if (!product) return null;
    return <ProductCard product={product} sourceSlug={sourceSlug} />;
  },
  ComparisonTable: ({ slugs, sourceSlug }: { slugs: string[]; sourceSlug?: string }) => {
    const products = slugs.map(getProductBySlug).filter(Boolean) as import("@/types").Product[];
    return <ComparisonTable products={products} sourceSlug={sourceSlug} />;
  },
  ProsConsList,
  RatingStars,
  PriceTag,
  CTAButton,
  AffiliateDisclosure,
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content ?? "");
  const relatedPosts = getRelatedPosts(slug, 3);
  const postUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <div className="flex gap-8">
      <JsonLd type="article" data={post} />
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "首頁", url: "/" },
          { name: "文章", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />
      {/* Article */}
      <article className="flex-1 min-w-0">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          返回文章列表
        </Link>

        {/* Header */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge slug={post.category} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.readingTime} 分鐘閱讀
              </span>
            )}
          </div>
          <ShareButtons title={post.title} url={postUrl} />
        </header>

        <Separator className="mb-8" />

        {/* Affiliate disclosure */}
        {post.affiliateProducts && post.affiliateProducts.length > 0 && (
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            {siteConfig.affiliateDisclosure}
          </div>
        )}

        {/* MDX Content */}
        <div className="prose-custom">
          <MDXRemote
            source={post.content ?? ""}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </div>

        {/* Tags */}
        <Separator className="my-8" />
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">標籤</h3>
          <TagList tags={post.tags} />
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <>
            <Separator className="my-8" />
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">相關文章</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <ArticleCard key={rp.slug} post={rp} />
                ))}
              </div>
            </section>
          </>
        )}
      </article>

      {/* TOC sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20">
          <TableOfContents headings={headings} />
        </div>
      </aside>
    </div>
  );
}
