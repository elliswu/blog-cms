import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { ArticleList } from "@/components/blog/ArticleList";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "文章",
  description: "所有文章列表 — 3C 科技產品評測、推薦與比較。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            所有文章
          </h1>
          <p className="mt-1 text-muted-foreground">
            共 {posts.length} 篇文章
          </p>
        </div>
        <ArticleList posts={posts} showFeatured />
      </div>
      <Sidebar />
    </div>
  );
}
