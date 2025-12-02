import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { Product } from "@/types/strapi/models/product";
import type { CTAButton } from "@/types/strapi/components/shared/cta-button";

export interface BenefitSection {
  id: number;
  section: BaseSection;
  ctaButton: CTAButton;
  products?: Product[];
}
