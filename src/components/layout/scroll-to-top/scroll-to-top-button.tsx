"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const toggleVisibility = () => {
      if (window.scrollY > 1200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isHomePage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isHomePage) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className={`hidden md:flex fixed bottom-8 right-8 z-50 rounded-full h-14 w-14 bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors group-hover:animate-bounce" />
    </Button>
  );
}
