import { notFound } from "next/navigation";
import qs from "qs";

export interface ExtendedParams {
  init?: RequestInit;
  populate?: object | string;
  sort?: string[];
  filters?: object;
}

export async function extendedFetch(
  input: string | URL | Request,
  params?: ExtendedParams
) {
  const queryParams: Record<string, any> = {};

  if (params?.populate) {
    queryParams["populate"] = params.populate;
  }

  if (params?.sort) {
    queryParams["sort"] = params.sort;
  }

  if (params?.filters) {
    queryParams["filters"] = params.filters;
  }

  const query = qs.stringify(queryParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${input}?${query}`,
    params?.init
  );

  if (!response.ok) {
    throw new Error("An error occured!");
  }

  if (response.status === 404) return notFound();

  return response;
}
