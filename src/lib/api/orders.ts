"use server";

import { extendedFetch, type ExtendedParams } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Order } from "@/types/strapi/models/order";

export async function getAllOrders(
  params?: ExtendedParams
): Promise<StrapiResponse<Order[]>> {
  const res = await extendedFetch("/orders", {
    init: {
      next: {
        revalidate: 60 * 15,
      },
    },
    ...params,
    auth: true,
  });
  return await res.json();
}
