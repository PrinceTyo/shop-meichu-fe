import { getProductData, getRecommendedProducts } from "@/lib/api/products";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import ProductDetailSection from "./_components/product-detail-section";
import SetFooter from "./_components/set-footer";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data: productData }, otherProductsData] = await Promise.all([
    getProductData(slug),
    getRecommendedProducts(),
  ]);

  if (!productData) {
    return notFound();
  }

  return (
    <Suspense fallback={<Skeleton className="w-full h-96" />}>
      <ProductDetailSection
        product={productData}
        relatedProducts={otherProductsData.data || []}
      />
      <SetFooter backgroundColor={productData.backgroundColor} />
    </Suspense>
  );
}
