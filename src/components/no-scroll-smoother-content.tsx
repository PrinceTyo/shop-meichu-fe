"use client";

import { createPortal } from "react-dom";

export default function NoScrollSmootherContent({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(children, document.body);
}
