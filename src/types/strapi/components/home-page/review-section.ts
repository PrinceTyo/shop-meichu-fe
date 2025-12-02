import type { Review } from "@/types/strapi/models/review";

export interface ReviewSection {
  id: string;
  reviews?: Review[];
}
