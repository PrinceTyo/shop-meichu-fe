import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { Product } from "@/types/strapi/models/product";

export interface RecommendationSection {
  id: number;
  section: BaseSection;
  products?: Product[];
}
