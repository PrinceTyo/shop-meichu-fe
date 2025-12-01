"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "@/components/global/image";

interface CardProps {
  id: number;
  sizeClass: string;
  image: string;
}

const leftCards: CardProps[] = [
  {
    id: 1,
    sizeClass: "size-28",
    image: "/assets/image/my.png",
  },
  {
    id: 2,
    sizeClass: "size-36",
    image: "/assets/image/my.png",
  },
];
const rightCards: CardProps[] = [
  {
    id: 1,
    sizeClass: "size-36",
    image: "/assets/image/my.png",
  },
  {
    id: 2,
    sizeClass: "size-28",
    image: "/assets/image/my.png",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleBackgroundRef = useRef<HTMLDivElement>(null);
  const svgTextRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const sectionSelector = gsap.utils.selector(sectionRef.current!);
    const leftCardElements = sectionSelector(".left-card");
    const rightCardElements = sectionSelector(".right-card");

    gsap.set(circleBackgroundRef.current!, {
      scale: 15,
    });

    gsap.to(svgTextRef.current!, {
      rotation: 360,
      duration: 10,
      ease: "linear",
      repeat: -1,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current!,
        start: "top top",
        end: "+=100%",
        pin: true,
        markers: true,
        scrub: true,
      },
    });

    timeline.to(circleBackgroundRef.current!, {
      scale: 1,
      ease: "power2.inOut",
      duration: 0.8,
    });

    const cardTimeline = gsap.timeline();
    leftCardElements.forEach((card, i) => {
      gsap.set(card, { translateX: "-50%" });

      cardTimeline.to(card, {
        x: (leftCardElements.length - i + 1) * -100,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    rightCardElements.forEach((card, i) => {
      gsap.set(card, { translateX: "-50%" });

      cardTimeline.to(card, {
        x: (i + 1) * 100,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    timeline.add(cardTimeline);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white font-rubik py-12 h-screen overflow-hidden"
    >
      <h3 className="text-4xl font-medium text-center max-w-5xl w-full mx-auto mb-7 xl:mb-20 xl:text-5xl relative z-1000">
        MAYA BLENDS TIMELESS ELEGANCE WITH MODERN TRENDS , CRAFTING FASHION THAT
        EMPOWERS CONFIDENCE AND GRACE. WITH PREMIUM FABRICS AND UNIQUE DESIGNS,
        WE CREATE STYLES THAT REDEFINE BEAUTY, ENSURING YOU SHINE EFFORTLESSLY
        IN EVERY MOMENT.
      </h3>

      <div className="flex items-center justify-center relative">
        {leftCards.map((card) => (
          <Image
            key={card.id}
            src={card.image}
            className={`left-card absolute left-1/2 object-cover ${card.sizeClass} rounded-full border-white border-6 shadow-md`}
          />
        ))}
        <div className="size-44 flex items-center justify-center relative rounded-full">
          <svg
            ref={svgTextRef}
            className="absolute w-full h-full z-1000"
            viewBox="0 0 300 300"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
              />
            </defs>
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="#fff"
              strokeWidth="40"
            />
            <circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            <text fill="#000" fontSize="17" letterSpacing="5" fontWeight="500">
              <textPath xlinkHref="#circlePath" startOffset="0%">
                PREMIUM DESIGN • ELEVATED EXPERIENCE • PREMIUM DESIGN •
              </textPath>
            </text>
          </svg>
          <div
            ref={circleBackgroundRef}
            className="absolute size-full bg-[#C8F51D] rounded-full scale-110 will-change-transform z-900"
          ></div>
        </div>
        {rightCards.map((card) => (
          <Image
            key={card.id}
            src={card.image}
            className={`right-card absolute left-1/2 object-cover ${card.sizeClass} rounded-full border-white border-6 shadow-md`}
          />
        ))}
      </div>
    </section>
  );
}
