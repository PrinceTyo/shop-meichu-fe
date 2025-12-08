import type { Category } from "@/types/strapi/models/category";

export interface PhilosophySection {
  id: number;
  description: string;
  ctaText: string;
  categories?: Category[];
}
