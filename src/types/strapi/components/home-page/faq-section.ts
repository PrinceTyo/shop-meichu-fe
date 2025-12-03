import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { Accordion } from "@/types/strapi/components/shared/accordion";

export interface FAQSection {
  id: number;
  section: BaseSection;
  questions: Accordion[];
}
