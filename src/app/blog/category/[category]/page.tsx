import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostsByCategory } from "@/lib/mdx";
import { getCategoryBySlug, getAllCategorySlugs } from "@/../data/categories";
import { ArticleList } from "@/components/blog/ArticleList";
import { Sidebar } from "@/components/layout/Sidebar";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} — 文章分類`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            所有文章
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {category.description} — 共 {posts.length} 篇文章
          </p>
        </div>
        <ArticleList posts={posts} />
      </div>
      <Sidebar />
    </div>
  );
}
