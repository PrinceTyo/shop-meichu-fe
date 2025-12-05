import type { Heading } from "@/types/strapi/components/shared/heading";
import type { MessageSection } from "@/types/strapi/components/about-us/message-section";
import type { ReviewSection } from "@/types/strapi/components/home-page/review-section";
import type { VideoSection } from "@/types/strapi/components/about-us/video-section";

export interface AboutUs {
  heading: Heading;
  message: string;
  messageSection: MessageSection;
  videoSection: VideoSection;
  reviewSection: ReviewSection;
}
