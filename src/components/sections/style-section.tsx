"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function StyleSection() {
  const styleRef = useRef(null);

  useGSAP(() => {
    gsap.set(".title-main", { opacity: 1, y: 100 });
    gsap.set(".title-description", { opacity: 0 });
    gsap.set(".category", { y: 300 });
    gsap.set(".button", { opacity: 0 });
    gsap.set(".image", { opacity: 0.5, x: -600, scale: 0.5 });
    gsap.set(".image2", { opacity: 0 });

    let splitTitle = new SplitText(".split-title", {
      type: "chars, words, lines",
      wordsClass: "word",
      linesClass: "line",
    });

    gsap.to(".title-main", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".title-main",
        start: "bottom 35%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
        scrub: 2,
      },
    });

    gsap.to(".title-description", {
      opacity: 1,
      duration: 1,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".title-main",
        start: "40%",
        end: "bottom",
        toggleActions: "play none none reverse",
        scrub: 1,
      },
    });

    gsap.from(splitTitle.words, {
      y: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".split-title",
        start: "top",
        end: "bottom",
        toggleActions: "play none none reverse",
        scrub: 2,
      },
    });

    gsap.to(".category", {
      y: 0,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".category",
        start: "top 25%",
        end: "top 25%",
        toggleActions: "play none none reverse",
        pin: true,
        pinSpacing: true,
      },
    });

    gsap.to(".image", {
      x: 0,
      scale: 1,
      duration: 1,
      opacity: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".image",
        start: "top 25%",
        end: "top 25%",
        toggleActions: "play none none reverse",
        pinSpacing: true,
        // toggleClass: { targets: [".image", ".image2"], className: "hidden" },
        // onEnter: () => {
        //   gsap.to(".image", { opacity: 0, duration: 0.5 });
        //   gsap.to(".image2", { opacity: 1, duration: 0.5 });
        // },
        // onLeaveBack: () => {
        //   gsap.to(".image", { opacity: 1, duration: 0.5 });
        //   gsap.to(".image2", { opacity: 0, duration: 0.5 });
        // },
      },
    });

    ScrollTrigger.create({
      trigger: styleRef.current,
      start: "top",
      end: "bottom",
      toggleActions: "play none none none",
      scrub: true,
      pin: true,
      pinSpacing: true,
    });
  }, []);

  return (
    <div
      ref={styleRef}
      className=" w-full min-h-screen bg-black text-white px-8 pt-14"
    >
      <div>
        <div className="w-full flex justify-center">
          <div className="absolute max-w-6xl w-full flex justify-center items-center gap-6">
            <div className="title-main">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-200 leading-tight font-rubik flex justify-center items-center text-center">
                STYLE CRAFTED TO PERFECTION
              </h1>
              <p className="mt-8 text-base leading-relaxed opacity-80 font-inter flex justify-center items-center text-center">
                Discover fashion that fits every mood! Explore our diverse
                collections, from casual essentials to statement trends. Find
                the perfect style for every occasion
              </p>
            </div>
          </div>
        </div>

        {/* category */}
        <div className="category z-20 w-full flex justify-center mb-16">
          <div className="max-w-6xl w-full flex justify-center items-center gap-6">
            <div className="bg-white/20 backdrop-blur-lg w-24 h-20 rounded-full flex items-center justify-center border border-white cursor-pointer">
              <Image
                src="/assets/image/3.svg"
                alt="contoh"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            <div className="bg-white text-black rounded-full w-[40%] h-20 flex items-center gap-4 shadow-md px-3 border-2 border-black cursor-pointer">
              <Image
                src="/assets/image/4.svg"
                alt="contoh"
                width={65}
                height={65}
                className="absolute object-contain"
              />

              <h1 className="text-[26px] font-arial font-normal flex-1 text-center ">
                Stylish Layers
              </h1>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-full w-24 h-20 flex items-center justify-center border-2 border-white cursor-pointer">
              <Image
                src="/assets/image/2.svg"
                alt="contoh"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center px-12">
            <div className="title-description">
              <h1 className="split-title text-4xl md:text-5xl font-bold text-white leading-tight font-rubik max-w-[480px]">
                STYLISH LAYERS FOR THE PERFECT LOOK
              </h1>

              <p className="mt-8 text-sm leading-relaxed opacity-80 font-inter max-w-2xl">
                Our curated collection for the perfect look features sleek
                jackets, smart knits, and versatile outerwear designed to keep
                you warm while making a statement. Top it off with timeless
                accessories that turn everyday moments into style milestones.
              </p>

              <p className="mt-8 text-sm leading-relaxed opacity-80 font-inter">
                Designed to complement each other seamlessly, these layers offer
                endless outfit possibilities while keeping you comfortable in
                changing temperatures. Create depth, add dimension, and showcase
                your personal flair with every layer you wear.
              </p>
            </div>

            <div className="relative w-full">
              <div className="imageUrl w-full h-[500px]">
                <Image
                  src="/assets/image/1.webp"
                  alt="model"
                  fill
                  className="z-10 image object-cover rounded-3xl transition-opacity"
                />
                <Image
                  src="/assets/image/my.png"
                  alt="model"
                  fill
                  className="image2 object-cover rounded-3xl transition-opacity"
                />
              </div>

              <div className="button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black pl-4 pr-2 py-2.5 rounded-full shadow-xl flex items-center gap-3 w-[85%] font-inter">
                <span className="flex items-center flex-1 font-inter text-sm md:text-base lg:text-lg text-gray-900 truncate">
                  Stylish Layers for the perfect look
                </span>

                <Button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0">
                  <MdOutlineArrowOutward />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
