"use client";

import { Check } from "lucide-react";

export function ProductCard({
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: string;
}) {
  return (
    <div className="product-card-item relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer transform-gpu will-change-transform hover:scale-105">
      <div className="relative w-full h-96">
        <img
          src={image}
          alt={name}
          className="object-cover transition-transform duration-700 ease-out"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent flex items-end justify-between">
        <div>
          <h3 className="font-semibold text-rubik text-white text-sm">
            {name}
          </h3>
          <p className="text-sm text-slate-300">
            ${price.toLocaleString("en-US")} USD
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-emerald-100 backdrop-blur flex items-center justify-center transition-transform duration-300">
          <Check className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
