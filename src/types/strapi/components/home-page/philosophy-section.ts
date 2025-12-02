import type { Category } from "@/types/strapi/models/category";

export interface PhilosophySection {
  id: number;
  description: string;
  ctxText: string;
  categories?: Category[];
}
