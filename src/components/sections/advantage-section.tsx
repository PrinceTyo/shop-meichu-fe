"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import { Progress } from "../ui/progress";

gsap.registerPlugin(ScrollTrigger);

export default function AdvantageSection() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !wrapperRef.current) return;
    gsap.set(".leftBox", { opacity: 1, scale: 1 });

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    const rect = wrapper.getBoundingClientRect();
    const totalScroll = rect.x + rect.width - window.innerWidth;

    let targetProgress = 0;
    let currentProgress = 0;

    gsap.ticker.add(() => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      setProgress(currentProgress);
    });

    gsap.to(wrapper, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll * 2}`,
        scrub: 3,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgress = self.progress * 100;
        },
      },
    });

    gsap.to(".leftBox", {
      opacity: 0,
      scale: 0,
      ease: "power4.in",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: () => `+=${totalScroll * 1}`,
        scrub: 1,
        markers: true,
      },
    });
  });

  const items = [
    {
      id: 1,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/Slide-1_Jacket_1.webp?v=1746436222&width=1400",
      badge: "Grace, Glamour, Style, Confidence",
      title: "Elegant Evening Wear",
    },
    {
      id: 2,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/slide-4_cap.webp?v=1748594740&width=1400",
      badge: "Warm, Cozy, Elegant, Premium",
      title: "Luxury Winter Collection",
    },
    {
      id: 3,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/slide-3_1.webp?v=1746436222&width=1400",
      badge: "Classic, Everyday, Stylish, Premium",
      title: "Timeless Wardrobe Essentials",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full h-screen bg-gray-100">
      <div className=" w-full flex items-center space-x-20 mx-16 py-10">
        <div className="leftBox min-w-[28%] space-y-5">
          <h1 className="font-medium text-5xl font-rubik text-wrap max-w-96">
            <span className="text-transparent text-outline">FASHION</span> THAT
            FLOWS WITH THE SEASONS
          </h1>
          <p className="font-rubik text-xs">
            Explore our latest collection of timeless fashion. From classic
            styles to modern trends, find the perfect look for every season.
            Shop now and elevate your wardrobe!
          </p>
          <div className="flex items-center space-x-0.5 cursor-pointer group">
            <HiOutlineArrowUpRight
              size={55}
              className="bg-white border border-black rounded-full p-4 transition-all duration-300 group-hover:-mr-14 group-hover:bg-black group-hover:text-white group-hover:scale-90"
            />
            <p className="bg-white px-8 py-4 border border-black rounded-full whitespace-nowrap transition-all duration-300 group-hover:pl-22.5">
              Explore More
            </p>
          </div>
        </div>

        <div ref={wrapperRef} className="min-w-max max-w-96 ms-10 pe-20">
          <div className=" flex gap-12 px-10">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <div className="p-2.5 rounded-4xl flex items-center justify-center shadow-md bg-white">
                  <div className="rounded-3xl group overflow-hidden">
                    <img
                      src={item.img}
                      className="max-w-200 max-h-110 rounded-3xl transition-transform duration-800 ease-out group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                </div>

                <p className="absolute max-w-56 z-10 px-6 py-4 bg-white w-fit border border-gray-300 rounded-2xl bottom-42 -left-7">
                  {item.badge}
                </p>

                <div className="flex items-center justify-center gap-8 mt-5">
                  <p className="font-rubik font-medium text-3xl">
                    {item.title}
                  </p>
                  <button className="text-xs px-8 py-4 border border-gray-800 rounded-full bg-transparent hover:bg-white cursor-pointer">
                    SHOP NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Progress
        value={progress}
        className="-top-10 w-[90vw] h-1 mt-8 mx-auto"
      />
    </section>
  );
}
