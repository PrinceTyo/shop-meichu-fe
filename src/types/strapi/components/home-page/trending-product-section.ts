import type { Product } from "@/types/strapi/models/product";
import type { SideText } from "@/types/strapi/components/shared/side-text";

export interface TrendingProductSection {
  id: number;
  sideText?: SideText;
  products?: Product[];
}
