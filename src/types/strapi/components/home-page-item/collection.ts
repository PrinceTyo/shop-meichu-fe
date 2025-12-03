import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";

export interface Collection {
  id: number;
  section: BaseSection;
  ctaText: string;
  category: Category;
  products: Product[];
}

