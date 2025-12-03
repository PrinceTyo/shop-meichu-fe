"use client";

import { createContext, useContext, useState } from "react";

import type { Product } from "@/types/strapi/models/product";

type CartItem = Pick<Product, "id" | "name" | "price" | "images"> & {
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  return <CartContext value={{ items, setItems }}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
