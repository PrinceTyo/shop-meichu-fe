import type { StrapiImage } from "@/types/strapi/media/image";
import type { StrapiVideo } from "@/types/strapi/media/video";
import type { BaseSection } from "@/types/strapi/components/shared/base-section";

export interface HeroSection {
  id: number;
  section: BaseSection;
  runningText?: string;
  background: StrapiImage | StrapiVideo;
}
