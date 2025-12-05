import type { StrapiImage } from "@/types/strapi/media/image";
import Image from "./image";

export default function StrapiImage({
  src,
  alt,
  size,
}: {
  src: StrapiImage;
  alt: string;
  size: "thumbnail" | "small" | "medium" | "large";
}) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${size ? src.formats?.[size]?.url || src.url : src.url}`}
      alt={alt}
    />
  );
}
