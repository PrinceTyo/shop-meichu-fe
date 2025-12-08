"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Category } from "@/types/strapi/models/category";
import type { ResultContract } from "@/types/api-return";

export async function getAllCategories(
  params?: ExtendedParams
): Promise<StrapiResponse<Category[]>> {
  const response = await extendedFetch("/categories", {
    init: {
      next: {
        revalidate: 1,
      },
    },
    ...params,
  });

  return response.json();
}

export async function getCategoryData(
  slug: string
): Promise<StrapiResponse<Category>> {
  const response = await extendedFetch(`/categories/${slug}`, {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return response.json();
}

export async function deleteProduct(
  slug: string,
  params?: ExtendedParams
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(`/categories/${slug}`, {
    init: {
      method: "DELETE",
    },
    ...params,
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}
