import type { HeroSection } from "@/types/strapi/components/home-page/hero-section";
import type { SubHeroSection } from "@/types/strapi/components/home-page/sub-hero-section";
import type { TrendingProductSection } from "@/types/strapi/components/home-page/trending-product-section";
import type { BenefitSection } from "@/types/strapi/components/home-page/benefit-section";
import type { PhilosophySection } from "@/types/strapi/components/home-page/philosophy-section";

export interface HomePage {
  heroSection: HeroSection;
  subHeroSection: SubHeroSection;
  trendingProductSection: TrendingProductSection;
  benefitSection: BenefitSection;
  philosophySection?: PhilosophySection;
}
