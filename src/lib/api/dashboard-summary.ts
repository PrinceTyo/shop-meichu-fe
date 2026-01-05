"use server";

import { extendedFetchWithAuth } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { DashboardSummary } from "@/types/strapi/api/dashboard-summary";
import { redirect } from "next/navigation";

export async function getDashboardSummary(): Promise<
  StrapiResponse<DashboardSummary>
> {
  const response = await extendedFetchWithAuth("/dashboard-summary", {
    init: {
      next: {
        revalidate: 0,
      },
    },
  });

  if (!response.ok && response.status === 401) {
    redirect("/logout?redirect=/admin/login");
  }

  return await response.json();
}
