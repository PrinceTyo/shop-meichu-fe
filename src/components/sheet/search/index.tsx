"use client";

import { IoClose } from "react-icons/io5";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSearch } from "@/context/search-provider";
import SearchInput from "./search-input";
import ProductResults from "./product-result";
import PopularCollections from "./popular-collections";

import type { Category } from "@/types/strapi/models/category";

export default function Search({ categories }: { categories: Category[] }) {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    productsResult,
    triggerSearch,
  } = useSearch();

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    triggerSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearchOpen(false);
    }
  };

  return (
    <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
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
              />
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              onScroll={handleScroll}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="lg:pr-4">
                <ProductResults products={productsResult} />
              </div>
            </div>
          </div>

          <PopularCollections categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
