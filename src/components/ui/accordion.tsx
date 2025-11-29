"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa6";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  iconBg = "bg-transparent",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  iconBg?: string;
}) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-left text-sm font-medium outline-none transition-all",
          "[&[data-state=open]_.plus-icon]:rotate-45",
          className
        )}
        {...props}
      >
        {children}

        <FaPlus
          className={cn(
            "plus-icon transition-transform duration-300 p-1.5 lg:p-2.5 border rounded-full w-7 h-7 md:w-7 lg:w-10 md:h-7 lg:h-10",
            iconBg,
            "border-white",
            iconBg.includes("bg-black") && "text-white",
            "group-hover:text-black"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
