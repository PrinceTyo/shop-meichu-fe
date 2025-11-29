"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productDesc } from "@/lib/data/descProduct";
import { Separator } from "../ui/separator";

export default function CustomerHelpSection() {
  return (
    <div className="bg-white w-full h-fit font-rubik flex flex-col items-start space-y-10 py-20">
      <div className="px-5 md:px-5 lg:px-10 space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Customer Help Center
        </h1>
        <p>
          Welcome to our Customer Help Center! We’re here to assist you with any
          questions or concerns you may have. Whether you need help with orders,
          shipping, returns, or product details, you’ll find all the answers
          right here.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <Separator />
        {productDesc.map((item) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="border-gray-300 w-screen relative left-1/2 right-1/2 -mx-[50vw] hover:bg-black data-[state=open]:bg-black data-[state=open]:text-white transition-colors"
          >
            <div className="px-4 md:px-5 lg:px-10">
              <AccordionTrigger
                iconBg="bg-black group-hover:bg-white data-[state=open]:!bg-white"
                className="group text-xl lg:text-xl font-bold md:font-medium hover:text-white data-[state=open]:text-white"
              >
                <span className="inline-block transition-transform group-hover:translate-x-2">
                  {item.title}
                </span>
              </AccordionTrigger>

              <AccordionContent className="text-balance">
                <p>{item.content}</p>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
