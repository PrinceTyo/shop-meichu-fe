import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import TrendingProduct from "@/components/card/trending-product";
import { Separator } from "../ui/separator";

interface RecentSearch {
  id: number;
  text: string;
}

interface Collection {
  id: number;
  name: string;
  href: string;
}

interface ProductColor {
  label: string;
  bgImg: string;
  bgColor: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  images: {
    front: string;
    hover: string;
  };
  sizes: string[];
  colors: ProductColor[];
}

const popularCollections: Collection[] = [
  {
    id: 1,
    name: "Sneakers Collection",
    href: "#",
  },
  {
    id: 2,
    name: "Running Essentials",
    href: "#",
  },
  {
    id: 3,
    name: "Formal Wear",
    href: "#",
  },
  {
    id: 4,
    name: "Casual Comfort",
    href: "#",
  },
  {
    id: 5,
    name: "Sports Performance",
    href: "#",
  },
  {
    id: 6,
    name: "Outdoor Adventure",
    href: "#",
  },
  {
    id: 7,
    name: "Limited Edition",
    href: "#",
  },
  {
    id: 8,
    name: "Eco-Friendly Line",
    href: "#",
  },
];

const initialRecentSearches = [{ id: 1, text: "White Sneakers" }];

const sampleProducts = [
  {
    id: 1,
    title: "Classic White Sneakers",
    price: 129,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      {
        label: "White",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-white",
      },
      {
        label: "Black",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-black",
      },
    ],
  },
  {
    id: 2,
    title: "Running Shoes Pro",
    price: 159,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      {
        label: "Blue",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-blue-500",
      },
      {
        label: "Red",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-red-500",
      },
    ],
  },
  {
    id: 3,
    title: "Casual Loafers",
    price: 89,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["39", "40", "41", "42"],
    colors: [
      {
        label: "Brown",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-amber-800",
      },
      {
        label: "Navy",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-blue-800",
      },
    ],
  },
  {
    id: 4,
    title: "Basketball Shoes",
    price: 149,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["40", "41", "42", "43"],
    colors: [
      {
        label: "Red",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-red-600",
      },
    ],
  },
  {
    id: 5,
    title: "Hiking Boots",
    price: 199,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["41", "42", "43", "44"],
    colors: [
      {
        label: "Green",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-green-700",
      },
    ],
  },
  {
    id: 6,
    title: "Formal Shoes",
    price: 179,
    images: {
      front: "./assets/gallery/girl4.jpg",
      hover: "./assets/gallery/girl4.jpg",
    },
    sizes: ["39", "40", "41", "42"],
    colors: [
      {
        label: "Black",
        bgImg: "./assets/gallery/girl4.jpg",
        bgColor: "bg-black",
      },
    ],
  },
];

export default function SearchLink() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredSearchId, setHoveredSearchId] = useState<number | null>(null);
  const [hoveredCollectionId, setHoveredCollectionId] = useState<number | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(
    initialRecentSearches
  );
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(sampleProducts);

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const searchExists = recentSearches.some(
        (search) =>
          search.text.toLowerCase() === searchQuery.trim().toLowerCase()
      );

      if (!searchExists) {
        const newSearch = {
          id: recentSearches.length + 1,
          text: searchQuery.trim(),
        };
        setRecentSearches([newSearch, ...recentSearches]);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(sampleProducts);
  };

  const handleRecentSearchClick = (searchText: string) => {
    setSearchQuery(searchText);
    const filtered = sampleProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Sheet open={isOpenSearch} onOpenChange={setIsOpenSearch}>
        <SheetTrigger asChild>
          <button className="text-white border-none hover:bg-gray-400 p-1 rounded-full flex items-center justify-center">
            <Search className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="border-none bg-[#f2f2f2]">
          <div className="relative w-full">
            <div className="fixed top-0 left-0 h-full bg-white px-3.5 py-3.5 w-14 z-50">
              <SheetTitle
                className="group cursor-pointer p-1 transition-all duration-200 rounded-none hover:bg-[#f2f2f2] hover:rounded-full"
                onClick={() => setIsOpenSearch(false)}
              >
                <IoClose className="w-5 h-5 transition-all duration-200 group-hover:rotate-180" />
              </SheetTitle>
            </div>

            <div className="flex">
              <div className="ml-24 mt-20 w-1/2">
                <div className="text-left">
                  <div className="flex items-start border-b border-gray-300 text-left">
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      className="border-none shadow-none rounded-none w-full h-12 text-2xl! placeholder:text-2xl px-0! focus-visible:ring-0 focus-visible:ring-offset-0 text-left"
                      placeholder="Search"
                    />
                    <div className="px-4 flex items-center">
                      {searchQuery ? (
                        <button
                          onClick={handleClearSearch}
                          className="text-xs font-medium hover:underline cursor-pointer"
                        >
                          Clear
                        </button>
                      ) : (
                        <IoSearchOutline className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  <ScrollArea className="h-[calc(100vh-180px)] pr-4">
                    <div className="mt-10 flex flex-col gap-6 text-left">
                      <div className="">
                        <h1 className="font-medium text-xl font-rubik text-left">
                          Recent search
                        </h1>
                      </div>
                      <div className="flex gap-4 text-left flex-wrap">
                        {recentSearches.map((search) => (
                          <div
                            key={search.id}
                            onClick={() => handleRecentSearchClick(search.text)}
                            onMouseEnter={() => setHoveredSearchId(search.id)}
                            onMouseLeave={() => setHoveredSearchId(null)}
                            className="rounded-full bg-transparent border border-gray-300 py-1 px-3 cursor-pointer transition-colors text-left overflow-hidden"
                          >
                            <div className="flex items-center justify-between gap-2 text-left">
                              <MdOutlineArrowOutward className="w-3 h-3" />
                              <div className="relative overflow-hidden h-5">
                                <div
                                  className={`transition-transform duration-300 ${
                                    hoveredSearchId === search.id
                                      ? "-translate-y-5"
                                      : "translate-y-0"
                                  }`}
                                >
                                  <div className="h-5 flex items-center">
                                    <h1 className="font-inter text-sm font-light text-left">
                                      {search.text}
                                    </h1>
                                  </div>
                                  <div className="h-5 flex items-center">
                                    <h1 className="font-inter text-sm font-light text-left">
                                      {search.text}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10 text-left">
                      <div className="flex items-center justify-between text-left">
                        <h1 className="font-semibold text-2xl font-rubik text-left">
                          {searchQuery
                            ? `RESULTS FOR "${searchQuery}"`
                            : "YOU MAY ALSO LIKE"}
                        </h1>
                        <div className="flex gap-4">
                          <button
                            onClick={handleScrollLeft}
                            className="bg-white p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300"
                          >
                            <MdKeyboardArrowLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleScrollRight}
                            className="bg-white p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300"
                          >
                            <MdKeyboardArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 text-left">
                        {filteredProducts.length > 0 ? (
                          <div
                            ref={scrollContainerRef}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="flex gap-6 pb-4 overflow-x-scroll scrollbar-hide cursor-grab select-none"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            {filteredProducts.map((product) => (
                              <div
                                key={product.id}
                                className="inline-block shrink-0"
                              >
                                <TrendingProduct
                                  product={product}
                                  size="sm"
                                  className="pointer-events-none"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">
                              No products found for "{searchQuery}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="w-3/8 fixed top-0 right-0 h-full bg-white px-10 py-10 rounded-3xl text-left">
                <div className="flex flex-col text-left">
                  <div className="">
                    <h1 className="text-5xl font-medium font-rubik text-left">
                      POPULAR COLLECTIONS
                    </h1>
                  </div>
                  <ScrollArea className="h-125 mt-10 text-left">
                    {popularCollections.map((collection) => (
                      <div key={collection.id} className="flex flex-col gap-2 mt-3">
                        <Link
                          href={collection.href}
                          onMouseEnter={() =>
                            setHoveredCollectionId(collection.id)
                          }
                          onMouseLeave={() => setHoveredCollectionId(null)}
                          className="flex gap-3 items-center group hover:translate-x-1 transition-transform"
                        >
                          <div className="p-1 border rounded-full group-hover:border-black transition-colors">
                            <MdOutlineArrowOutward className="w-4 h-4" />
                          </div>
                          <div className="relative overflow-hidden h-9">
                            <div
                              className={`transition-transform duration-300 ${
                                hoveredCollectionId === collection.id
                                  ? "-translate-y-9"
                                  : "translate-y-0"
                              }`}
                            >
                              <div className="h-9 flex items-center">
                                <h1 className="text-2xl font-rubik font-medium text-left">
                                  {collection.name}
                                </h1>
                              </div>
                              <div className="h-9 flex items-center">
                                <h1 className="text-2xl font-rubik font-medium text-left">
                                  {collection.name}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <Separator />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
