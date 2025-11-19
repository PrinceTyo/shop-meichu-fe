"use client"

import { ProductCard } from "@/components/card/product-card";
import { useRef } from "react";

export default function BundleSection() {
  const bundleRef = useRef(null);

  const products = [
    {
      name: "Cotton Cropped Trucker Shirt",
      price: 2500,
      image: "/assets/image/my.png",
    },
    {
      name: "Full Sleeve Round Neck T-shirt",
      price: 4000,
      image: "/assets/image/my.png",
    },
    {
      name: "Loose T-shirt",
      price: 3500,
      image: "/assets/image/my.png",
    },
    {
      name: "Racerback Sports Bra",
      price: 3400,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
    },
  ];

  return (
    <div
      ref={bundleRef}
      className=" w-full min-h-screen bg-black text-white px-8 py-14"
    >
      <div>
        <div className="w-full flex justify-center mt-20">
          <div className="max-w-6xl w-full flex justify-center items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-200 leading-tight font-rubik flex justify-center items-center text-center">
                Bundle Up & Save More
              </h1>
              <p className="mt-8 text-base leading-relaxed opacity-80 font-inter flex justify-center items-center text-center max-w-3xl">
                Make shopping easier and faster by selecting the products you
                love and adding them to your cart in just a few clicks. Browse
                through our collection, choose your favorites, and get one step
                closer to checkout. Smart shopping starts here - simple,
                seamless, and stress-free.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto px-2 mt-20">
          <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
