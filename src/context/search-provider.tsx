"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import useSWRMutation from "swr/mutation";

import type { Product } from "@/types/strapi/models/product";
import type { StrapiResponse } from "@/types/strapi/response";

async function searchProducts(
  url: string,
  { arg }: { arg: { query: string } }
): Promise<Product[]> {
  const response = await fetch(
    `${url}?populate=*&filters[name][$contains]=${arg.query}`
  );
  if (!response.ok) return [];

  const result = (await response.json()) as StrapiResponse<Product[]>;
  return result.data;
}

interface SearchContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  productsResult: Product[];
  triggerSearch: (query?: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [productsResult, setProductsResult] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
    searchProducts
  );
  const debouncedSearch = useDebouncedCallback(async (query?: string) => {
    const result = await trigger({ query: query || searchQuery });
    setProductsResult(result);
  }, 500);

  return (
    <SearchContext
      value={{
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        productsResult,
        triggerSearch: debouncedSearch,
      }}
    >
      {children}
    </SearchContext>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
