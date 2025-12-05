import type { StrapiImage } from "@/types/strapi/media/image";
import type { BaseSection } from "@/types/strapi/components/shared/base-section";

export interface MessageSection {
  section: BaseSection;
  image: StrapiImage;
}
