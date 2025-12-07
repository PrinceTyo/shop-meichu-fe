"use server";

import { StrapiResponse } from "@/types/strapi/response";
import { Category } from "@/types/strapi/models/category";
import { extendedFetch, type ExtendedParams } from "./base";

export async function getAllCategories(
  params?: ExtendedParams
): Promise<StrapiResponse<Category[]>> {
  const response = await extendedFetch("/categories", {
    init: {
      next: {
        revalidate: 60 * 10,
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
