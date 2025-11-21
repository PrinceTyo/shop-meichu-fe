"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrendingProductProps {
  className: string;
  product: {
    id: number;
    title: string;
    price: number;
    images: { front: string; hover: string };
    sizes: string[];
    colors: { label: string; img: string }[];
  };
}

export default function TrendingProduct({
  product,
  className,
}: TrendingProductProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleColorClick = (img: string) => {
    setSelectedImage(img);
  };

  return (
    <div className={`max-w-38 space-y-3.5 ${className || ""}`}>
      <div className="bg-gray-400 w-fit border border-gray-500 rounded-3xl relative overflow-hidden group">
        <img
          src={selectedImage || product.images.front}
          className="w-38 h-45 object-cover rounded-3xl transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
          alt=""
        />
        <img
          src={product.images.hover}
          className="w-38 h-45 object-cover rounded-3xl absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          alt=""
        />

        <div className="absolute inset-0 flex items-end justify-center text-black text-[10px] font-medium font-inter opacity-0 translate-y-full transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <div className="w-28 group/quickview transition-all duration-300 ease-out group-hover/quickview:-translate-y-16">
            <div className="flex items-center justify-between gap-2 py-2 px-2 rounded-t-xl bg-gray-100 cursor-pointer">
              <h1 className="-mb-2">QUICK VIEW</h1>
              <FaPlus className="-mb-2" />
            </div>

            <div className="bg-gray-100 rounded-b-xl px-3 pb-2 max-h-0 transition-all duration-800 ease-out group-hover/quickview:max-h-20 group-hover/quickview:mb-2">
              <div className="pt-2">
                <Separator className="mb-3" />
                <div className="flex gap-1.5 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-2 py-1 text-[10px] border border-gray-300 rounded hover:bg-black hover:text-white transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-1.5 space-y-1.5 font-inter group/info relative">
        <div className="transition-all space-y-1.5 duration-300 ease-out group-hover/info:opacity-0">
          <h1 className="text-xs font-semibold">{product.title}</h1>
          <p className="text-xs">${product.price.toLocaleString()} USD</p>
        </div>

        <div className="absolute inset-x-0 top-0 flex justify-center opacity-0 transition-all duration-300 ease-out group-hover/info:opacity-100">
          <div className="flex items-center gap-1.5 overflow-x-auto px-2 py-1 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {product.colors.map((color, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="bg-gray-400 border border-gray-300 cursor-pointer shrink-0"
                    onClick={() => handleColorClick(color.img)}
                  >
                    <img
                      src={color.img}
                      className="w-8 h-8 object-cover"
                      alt=""
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-white">{color.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
