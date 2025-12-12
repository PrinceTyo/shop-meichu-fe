/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoClose } from "react-icons/io5";
import { SearchIcon } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import SearchInput from "./search-input";
import ProductResults from "./product-result";
import PopularCollections from "./popular-collections";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";
import type { StrapiResponse } from "@/types/strapi/response";

async function fetchRecommendedProducts(url: string): Promise<Product[]> {
  const response = await fetch(
    `${url}?populate=*&pagination[limit]=12&sort=createdAt:desc`
  );
  if (!response.ok) return [];

  const result = (await response.json()) as StrapiResponse<Product[]>;
  return result.data;
}

async function searchProducts(
  url: string,
  { arg }: { arg: { query: string } }
): Promise<Product[]> {
  if (!arg.query || arg.query.trim() === "") return [];

  const response = await fetch(
    `${url}?populate=*&filters[name][$contains]=${encodeURIComponent(arg.query)}&pagination[limit]=20`
  );
  if (!response.ok) return [];

  const result = (await response.json()) as StrapiResponse<Product[]>;
  return result.data;
}

export default function Search({ categories }: { categories: Category[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const pathname = usePathname();

  const {
    data: recommendedProducts = [],
    isLoading: isLoadingRecommended,
    mutate: mutateRecommended,
  } = useSWR(
    isSearchOpen ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products` : null,
    fetchRecommendedProducts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const {
    trigger,
    data: searchResults = [],
    isMutating: isSearching,
    reset: resetSearchResults,
  } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
    searchProducts
  );

  const debouncedSearch = useDebouncedCallback(async (query?: string) => {
    const q = query || searchQuery;
    if (q.trim()) {
      await trigger({ query: q });
    } else {
      resetSearchResults();
    }
  }, 500);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
      resetSearchResults();
    } else {
      mutateRecommended();
    }
  }, [isSearchOpen, setSearchQuery, resetSearchResults, mutateRecommended]);

  const handleClearSearch = () => {
    setSearchQuery("");
    resetSearchResults();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      resetSearchResults();
    }
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearchOpen(false);
    }
  };

  const productsToShow = searchQuery.trim()
    ? searchResults
    : recommendedProducts;
  const hasProducts = productsToShow.length > 0;
  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <SheetTrigger asChild>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="text-white border-none hover:bg-gray-900 cursor-pointer p-2 rounded-full flex items-center justify-center"
          aria-label="Open search"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="border-none data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top transition-all duration-300 ease-in-out inset-y-0 h-full w-full bg-[#f2f2f2] p-0"
        onInteractOutside={(e) => {
          if (e.type === "wheel" || e.type === "touchmove") {
            e.preventDefault();
          }
        }}
      >
        <div className="hidden lg:block fixed top-0 left-0 h-full bg-white px-3.5 py-3.5 w-14 z-50">
          <SheetTitle
            className="group cursor-pointer p-1 transition-all duration-200 rounded-none hover:bg-[#f2f2f2] hover:rounded-full"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <IoClose className="w-5 h-5 transition-all duration-200 group-hover:rotate-180" />
          </SheetTitle>
        </div>

        <div
          className="h-screen overflow-y-scroll lg:flex lg:overflow-hidden"
          onScroll={handleScroll}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="lg:h-156 lg:ml-24 lg:mt-20 lg:w-1/2 flex flex-col overflow-hidden">
            <div className="shrink-0">
              <SearchInput
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
                onClose={() => setIsSearchOpen(false)}
                isLoading={isSearching}
              />
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              onScroll={handleScroll}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="lg:pr-4">
                <ProductResults
                  products={productsToShow}
                  searchQuery={searchQuery}
                  isLoading={
                    isSearchActive ? isSearching : isLoadingRecommended
                  }
                  isSearchActive={isSearchActive}
                  hasRecommendedProducts={recommendedProducts.length > 0}
                />
              </div>
            </div>
          </div>

          <PopularCollections categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
