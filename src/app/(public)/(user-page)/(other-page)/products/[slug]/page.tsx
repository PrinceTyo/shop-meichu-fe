import { getProductData, getRecommendedProducts } from "@/lib/api/products";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDetailSection from "./_components/product-detail-section";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [productData, otherProductsData] = await Promise.all([
    getProductData(slug),
    getRecommendedProducts(),
  ]);

  return (
    <Suspense fallback={<Skeleton className="w-full h-96" />}>
      <ProductDetailSection
        product={productData.data}
        relatedProducts={otherProductsData.data || []}
      />
    </Suspense>
  );
}
