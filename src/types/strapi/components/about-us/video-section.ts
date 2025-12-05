import type { StrapiVideo } from "@/types/strapi/media/video";
import type { CTAButton } from "@/types/strapi/components/shared/cta-button";

export interface VideoSection {
  message: string;
  video: StrapiVideo;
  cards: {
    header: string;
    description?: string;
    ctaButton: CTAButton;
  }[];
}
