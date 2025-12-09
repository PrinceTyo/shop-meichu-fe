"use client";

import Search from "@/components/sheet/search";
import ShoppingCart from "@/components/sheet/shopping-cart";
import type { Category } from "@/types/strapi/models/category";

export default function NavbarActions({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <>
      <Search categories={categories} />
      <ShoppingCart />
    </>
  );
}
