import type { Collection } from "@/types/strapi/components/home-page-item/collection";

export interface CollectionSection {
  id: number;
  collections: Collection[];  
}

