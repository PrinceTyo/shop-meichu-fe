"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import DesktopNav from "./desktop-navbar";
import NavActions from "./navbar-actions";
import BottomNav from "./bottom-navbar";
import { cn } from "@/lib/utils";
import {
  navLinks,
  homeCategories,
  catalogCategories,
  bottomNavItems,
} from "@/lib/data/navbar";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 1000);

      if (current > lastScrollY.current && current > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 font-inter transition-all duration-300 text-white select-none",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-black border-b border-[#222121]"
            : "bg-transparent border-b border-[#222121]/20"
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-6 lg:py-1">
          <div className="flex justify-between items-center h-16">
            <div className="flex item-center">
              <MobileMenu
                homeCategories={homeCategories}
                catalogCategories={catalogCategories}
              />

              <div className="shrink-0 lg:ml-0 ml-4">
                <Link href="/" className="text-3xl font-light tracking-wide">
                  MEICHU
                </Link>
              </div>
            </div>

            <DesktopNav navLinks={navLinks} />

            <NavActions />
          </div>
        </div>
      </nav>

      <BottomNav items={bottomNavItems} isVisible={isVisible} />
    </>
  );
}
