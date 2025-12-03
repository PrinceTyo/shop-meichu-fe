import type { Product } from "@/types/strapi/models/product";
import type { BaseSection } from "@/types/strapi/components/shared/base-section";

export interface TrendingProductSection {
  id: number;
  section: BaseSection;
  products?: Product[];
}
