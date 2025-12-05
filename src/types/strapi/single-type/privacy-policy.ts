import type { BaseModel } from "@/types/strapi/models/base-model";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface PrivacyPolicy extends BaseModel {
  content: BlocksContent;
}
