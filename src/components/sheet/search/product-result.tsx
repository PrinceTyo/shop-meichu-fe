"use client";

import { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "@/components/card/product-card";
import { Skeleton } from "@/components/ui/skeleton";

import type { Product } from "@/types/strapi/models/product";

interface ProductResultsProps {
  products: Product[];
  searchQuery: string;
  isLoading?: boolean;
  isSearchActive?: boolean;
  hasRecommendedProducts?: boolean;
}

export default function ProductResults({
  products,
  searchQuery,
  isLoading = false,
  isSearchActive = false,
  hasRecommendedProducts = false,
}: ProductResultsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isMobile = useIsMobile();

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };

  const getTitle = () => {
    if (isLoading) {
      return isSearchActive ? "SEARCHING..." : "LOADING...";
    }

    if (isSearchActive) {
      return products.length > 0 ? "RESULTS FOR" : "NO RESULTS FOR";
    }

    return "YOU MAY ALSO LIKE";
  };

  const shouldShowScrollButtons = products.length > 0 && !isLoading;

  const renderSkeleton = () => {
    const cardWidth = isMobile ? "w-64" : "w-72";

    return (
      <div className="flex gap-6 pb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`shrink-0 ${cardWidth} space-y-3`}>
            <Skeleton className="h-80 rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  };

  const renderSkeletonWithTitle = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between text-left py-6">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4 pr-4 lg:pr-0">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>

        {renderSkeleton()}
      </div>
    );
  };

  const renderProducts = () => {
    if (isLoading) {
      return renderSkeleton();
    }

    if (products.length > 0) {
      return (
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide no-scrollbar cursor-grab select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              size={isMobile ? "lg" : "sm"}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  const renderEmptyState = () => {
    if (isLoading) return null;

    if (products.length === 0) {
      return (
        <div className="flex justify-center items-center h-50">
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              {isSearchActive
                ? `No products found for "${searchQuery}"`
                : hasRecommendedProducts
                  ? "Start typing to search for products"
                  : "No recommended products available"}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (isLoading && products.length === 0 && !isSearchActive) {
    return (
      <div className="my-3 lg:mt-10 text-left bg-white lg:bg-transparent pl-5 lg:pl-0">
        {renderSkeletonWithTitle()}
      </div>
    );
  }

  return (
    <div className="my-3 lg:mt-10 text-left bg-white lg:bg-transparent pl-5 lg:pl-0">
      <div className="flex items-center justify-between text-left py-6">
        <h1 className="font-medium lg:font-semibold text-xl lg:text-2xl font-rubik text-left">
          {getTitle()}
        </h1>

        {shouldShowScrollButtons && (
          <div className="flex gap-4 pr-4 lg:pr-0">
            <button
              onClick={handleScrollLeft}
              className="bg-white p-2 lg:p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300 z-10 relative"
              aria-label="Scroll left"
            >
              <MdKeyboardArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white p-2 lg:p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300 z-10 relative"
              aria-label="Scroll right"
            >
              <MdKeyboardArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {renderProducts()}
      {renderEmptyState()}
    </div>
  );
}
