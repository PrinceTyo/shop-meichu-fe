"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  href?: string;
  text: string;
  items?: { title: string; href: string }[];
  categories?: any[];
  isDropdown?: boolean;
  className?: string;
}

export default function NavLink({
  href,
  text,
  items,
  categories,
  isDropdown = false,
  className = "",
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const AnimatedText = ({
    text,
    isHovered,
  }: {
    text: string;
    isHovered: boolean;
  }) => (
    <div className="relative h-6 overflow-hidden text-base text-gray-300 hover:text-white transition-colors">
      <div
        className={`transition-transform duration-300 ${
          isHovered ? "-translate-y-6" : "translate-y-0"
        }`}
      >
        <div className="h-6 flex items-center">{text}</div>
        <div className="h-6 flex items-center">{text}</div>
      </div>
    </div>
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isDropdown && items) {
    // Check jika ini menu Catalog (tidak punya subcategories)
    const isCatalogMenu =
      categories && categories.length > 0 && !categories[0].subcategories;

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={`flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4 cursor-pointer ${className}`}
            onMouseEnter={() => {
              handleMouseEnter();
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
            <AnimatedText text={text} isHovered={isHovered} />
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white text-black mt-4 rounded-2xl"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {isCatalogMenu ? (
            <div className="py-6 px-10">
              <div className="flex flex-col gap-3">
                {categories?.map((category: any) => (
                  <Link
                    key={category.title}
                    href={category.href}
                    className="font-rubik text-base font-medium hover:text-gray-600 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-10 px-20">
              <div className="flex items-start gap-10">
                {categories && categories.length > 0
                  ? categories.map((category: any) => (
                      <div
                        key={category.title || category.href}
                        className="flex flex-col gap-2"
                      >
                        <h1 className="text-base font-rubik font-medium mb-1">
                          {category.title}
                        </h1>
                        {category.subcategories &&
                          category.subcategories.map((sub: any) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              className="font-inter text-sm font-normal hover:text-gray-600 transition-colors"
                            >
                              {sub.title}
                            </Link>
                          ))}
                      </div>
                    ))
                  : 
                    items?.map((item) => (
                      <div key={item.title} className="flex flex-col gap-2">
                        <Link
                          href={item.href}
                          className="font-inter text-base font-medium hover:text-gray-600 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`hover:text-white text-base text-gray-300 transition-colors px-4 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedText text={text} isHovered={isHovered} />
    </Link>
  );
}
