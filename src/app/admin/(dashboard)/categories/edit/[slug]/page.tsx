import { getSpecificItem } from "@/actions/admin";
import { UpdateCategoryForm } from "@/components/form/admin/update-form";

import type { Category } from "@/types/strapi/models/category";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Category>("categories", slug);

  return <UpdateCategoryForm category={data} />;
}
