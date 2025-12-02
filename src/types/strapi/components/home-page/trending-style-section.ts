import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { CTAButton } from "@/types/strapi/components/shared/cta-button";
import type { Product } from "@/types/strapi/models/product";

export interface TrendingStyleSection {
  id: number;
  section: BaseSection;
  ctaButton: CTAButton;
  products?: Product[];
}
