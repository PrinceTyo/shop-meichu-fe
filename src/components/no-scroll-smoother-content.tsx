"use client";

import { useIsClient } from "@/hooks/use-is-client";
import { createPortal } from "react-dom";

export default function NoScrollSmootherContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();

  if (!isClient) return null;

  return createPortal(children, document.body);
}
