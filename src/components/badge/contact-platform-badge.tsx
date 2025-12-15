import { Badge } from "@/components/ui/badge";
import { MailIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

import type { LucideIcon } from "lucide-react";
import type { Request as RequestType } from "@/types/strapi/models/request";
import type { IconType } from "react-icons/lib";

type Variant = "default" | "border";

const statusIcons: Record<
  RequestType["contactPlatform"],
  IconType | LucideIcon
> = {
  email: MailIcon,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
};

const statusClasses: Record<
  Variant,
  Record<RequestType["contactPlatform"], string>
> = {
  default: {
    email: "bg-red-600 dark:text-white text-black",
    instagram: "bg-purple-600 dark:text-white text-black",
    whatsapp: "bg-green-600 dark:text-white text-black",
    facebook: "bg-blue-600 dark:text-white text-black",
  },
  border: {
    email: "border-red-600 bg-red-600/20 dark:text-red-100 text-red-600",
    instagram:
      "border-purple-600 bg-purple-600/20 dark:text-purple-100 text-purple-600",
    whatsapp:
      "border-green-600 bg-green-600/20 dark:text-green-100 text-green-600",
    facebook: "border-blue-600 bg-blue-600/20 dark:text-blue-100 text-blue-600",
  },
};

const statusStrings: Record<RequestType["contactPlatform"], string> = {
  email: "Email",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
};

export function ContactPlatformBadge({
  platform,
  variant = "default",
}: {
  platform: RequestType["contactPlatform"];
  variant?: Variant;
}) {
  const Icon = statusIcons[platform];
  return (
    <Badge className={statusClasses[variant][platform]}>
      <Icon className="size-4" /> {statusStrings[platform]}
    </Badge>
  );
}
