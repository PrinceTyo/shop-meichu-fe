"use client";

import { ProductCard } from "@/components/card/product-card";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function BundleSection() {
  const bundleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".product-card-item");

      cards.forEach((card: any, index: number) => {
        const column = index % 5;
        const isEven = column % 2 === 0;
        const direction = isEven ? -100 : -30;

        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top center",
          end: "center top",
          scrub: 0.2,
          markers: true,
          toggleActions: "play none none reverse",
          onUpdate: (self) => {
            // self.progress = 0 → top
            // self.progress = 1 → bottom
            const progress = self.progress;
            gsap.to(card, {
              y: direction * progress,
              ease: "none",
              overwrite: "auto",
            });
          },
        });
      });
    },
    { scope: bundleRef }
  );



  return (
    <div
      ref={bundleRef}
      className="w-full min-h-screen bg-black text-white px-8 py-14"
    >
      <div>
        <div className="w-full flex justify-center mt-20">
          <div className="max-w-6xl w-full flex justify-center items-center gap-6">
            <div className="">
              <h1 className="text-4xl md:text-6xl font-medium text-slate-200 leading-tight font-rubik flex justify-center items-center text-center">
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

        <div ref={cardsRef} className="w-full mx-auto px-2 mt-20">
          <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((item, index) => (
              <div key={index} className="">
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
