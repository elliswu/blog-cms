import type { Metadata } from "next";
import { getAllProducts } from "@/lib/affiliate";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "產品推薦",
  description: "精選 3C 科技產品推薦，幫你找到最適合的好物。",
};

export default function ProductsPage() {
  const products = getAllProducts();
  const featured = products.filter((p) => p.featured);
  const regular = products.filter((p) => !p.featured);

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            產品推薦
          </h1>
          <p className="mt-1 text-muted-foreground">
            精選 {products.length} 款產品，幫你找到最適合的好物
          </p>
        </div>

        {featured.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">精選推薦</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {regular.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">所有產品</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {regular.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Sidebar />
    </div>
  );
}
