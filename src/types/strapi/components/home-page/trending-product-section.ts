import type { Product } from "@/types/strapi/models/product";

export interface TrendingProductSection {
  id: number;
  products?: Product[];
}
