import type { Category } from "@/types/strapi/models/category";

export interface SubHeroSection {
  id: number;
  description: string;
  categories?: Category[];
}
