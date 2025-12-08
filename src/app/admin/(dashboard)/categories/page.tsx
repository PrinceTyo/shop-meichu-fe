import { categoriesColumn } from "@/config/table-column";
import { TableActionProvider } from "@/context/table-action-provider";
import { getAllCategories, deleteProduct } from "@/lib/api/categories";
import { AdminTable } from "@/components/table/admin-table";

import type { ExtendedParams } from "@/lib/api/base";

export async function getAllCategoriesWithProductCount(
  params?: ExtendedParams
) {
  "use server";
  const response = await getAllCategories({
    populate: {
      thumbnail: true,
      products: {
        count: true,
      },
    },
    ...params,
  });

  return response;
}

export default async function Page() {
  return (
    <TableActionProvider
      getAction={getAllCategoriesWithProductCount}
      deleteAction={deleteProduct}
    >
      <AdminTable
        columns={categoriesColumn}
        routes={{ create: "/admin/categories/create" }}
      />
    </TableActionProvider>
  );
}
