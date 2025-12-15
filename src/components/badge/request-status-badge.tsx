import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  XIcon,
  CheckCheckIcon,
  PencilIcon,
  TagIcon,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Request as RequestType } from "@/types/strapi/models/request";

type Variant = "default" | "border";

const statusIcons: Record<RequestType["requestStatus"], LucideIcon> = {
  pending: ClockIcon,
  confirmed: TagIcon,
  in_progress: PencilIcon,
  completed: CheckCheckIcon,
  cancelled: XIcon,
};

const statusClasses: Record<
  Variant,
  Record<RequestType["requestStatus"], string>
> = {
  default: {
    pending: "bg-orange-600 dark:text-white text-black",
    confirmed: "bg-teal-600 dark:text-white text-black",
    in_progress: "bg-yellow-600 dark:text-white text-black",
    completed: "bg-green-600 dark:text-white text-black",
    cancelled: "bg-red-600 dark:text-white text-black",
  },
  border: {
    pending:
      "border-orange-600 bg-orange-600/20 dark:text-orange-100 text-orange-600",
    confirmed:
      "border-teal-600 bg-teal-600/20 dark:text-teal-100 text-teal-600",
    in_progress:
      "border-yellow-600 bg-yellow-600/20 dark:text-yellow-100 text-yellow-600",
    completed:
      "border-green-600 bg-green-600/20 dark:text-green-100 text-green-600",
    cancelled: "border-red-600 bg-red-600/20 dark:text-red-100 text-red-600",
  },
};

const statusStrings: Record<RequestType["requestStatus"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function RequestStatusBadge({
  status,
  variant = "default",
}: {
  status: RequestType["requestStatus"];
  variant?: Variant;
}) {
  const Icon = statusIcons[status];
  return (
    <Badge className={statusClasses[variant][status]}>
      <Icon className="size-4" /> {statusStrings[status]}
    </Badge>
  );
}
