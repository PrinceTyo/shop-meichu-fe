import type { Review } from "@/types/strapi/models/review";
import type { BaseSection } from "@/types/strapi/components/shared/base-section";

export interface ReviewSection {
  id: string;
  section: BaseSection;
  reviews?: Review[];
}
