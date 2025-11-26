import { fetchAdmin } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag } from "lucide-react";

import type { DashboardSummary } from "@/types/strapi/api/dashboard-summary";
import type { StrapiResponse } from "@/types/strapi/response";

export default async function Page() {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard-summary`
  );
  const { data }: StrapiResponse<DashboardSummary> = await response.json();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Categories
          </CardTitle>
          <Tag className="size-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalCategories}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="size-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalProducts}</div>
        </CardContent>
      </Card>
    </div>
  );
}
