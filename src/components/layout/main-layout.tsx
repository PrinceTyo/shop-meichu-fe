import { Suspense } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ScrollSmootherLayout from "@/components/layout/scroll-smoother-layout";
import { getFooterData } from "@/lib/api/footer";
import { getAllCategories } from "@/lib/api/categories";
import { getNavbarData } from "@/lib/api/navbar";
import { Skeleton } from "../ui/skeleton";

export default async function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [{ data: navbarData }, { data: footerData }, { data: categoriesData }] =
    await Promise.all([getNavbarData(), getFooterData(), getAllCategories()]);

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-16" />}>
        <Navbar data={navbarData} categories={categoriesData} />
      </Suspense>
      <ScrollSmootherLayout>
        {children}
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <Footer data={footerData} />
        </Suspense>
      </ScrollSmootherLayout>
    </>
  );
}
