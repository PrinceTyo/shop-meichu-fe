"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  FaCheck,
  FaFacebookF,
  FaMinus,
  FaPinterest,
  FaPlus,
  FaXTwitter,
} from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowBack,
  IoMdArrowDown,
  IoMdArrowForward,
  IoMdArrowUp,
} from "react-icons/io";
import {
  FaSearchMinus,
  FaSearchPlus,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

export default function OverviewSection({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.front
  );
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState<string>("");
  const [dialogImageIndex, setDialogImageIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isZoomed = zoom > 1;

  useGSAP(
    () => {
      if (window.innerWidth < 768) return;

      if (!sectionRef.current || !detailRef.current || !imageListRef.current)
        return;

      const section = sectionRef.current;
      const detailContent = detailRef.current;
      const imageList = imageListRef.current;

      detailContent.scrollTop = 0;
      imageList.scrollTop = 0;

      ScrollTrigger.refresh();

      const imageScroll = imageList.scrollHeight - imageList.clientHeight;
      const detailScroll =
        detailContent.scrollHeight - detailContent.clientHeight;

      const totalScrollDistance = imageScroll + detailScroll;

      const imagePhaseEnd = imageScroll / totalScrollDistance;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: 4,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= imagePhaseEnd) {
            const imageProgress = progress / imagePhaseEnd;

            gsap.to(imageList, {
              scrollTop: imageProgress * imageScroll,
              duration: 0.5,
              ease: "none",
            });
            detailContent.scrollTop = 0;
          } else {
            const detailProgress =
              (progress - imagePhaseEnd) / (1 - imagePhaseEnd);

            gsap.to(detailContent, {
              scrollTop: detailProgress * detailScroll,
              duration: 0.5,
              ease: "none",
            });

            imageList.scrollTop = imageScroll;
          }
        },
        onEnter: () => {
          detailContent.style.overflow = "hidden";
          imageList.style.overflow = "hidden";
        },

        onEnterBack: () => {
          detailContent.style.overflow = "hidden";
          imageList.style.overflow = "hidden";
        },
      });
    },
    { dependencies: [], scope: sectionRef }
  );

  const handleColorClick = (img: string, index: number) => {
    setSelectedImage(img);
    setActiveColorIndex(index);
  };

  const handleImageClick = (img: string, index: number) => {
    setDialogImage(img);
    setDialogImageIndex(index);
    setDialogOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevImage = () => {
    if (slideDirection) return;
    setSlideDirection("right");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const prevIndex =
        dialogImageIndex === 0
          ? product.colors.length - 1
          : dialogImageIndex - 1;
      setDialogImageIndex(prevIndex);
      setDialogImage(product.colors[prevIndex].bgImg);
      setSlideDirection(null);
    }, 400);
  };

  const handleNextImage = () => {
    if (slideDirection) return;
    setSlideDirection("left");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const nextIndex =
        dialogImageIndex === product.colors.length - 1
          ? 0
          : dialogImageIndex + 1;
      setDialogImageIndex(nextIndex);
      setDialogImage(product.colors[nextIndex].bgImg);
      setSlideDirection(null);
    }, 400);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (!isZoomed) return;

    const moveAmount = 100;
    setPosition((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, y: prev.y + moveAmount };
        case "down":
          return { ...prev, y: prev.y - moveAmount };
        case "left":
          return { ...prev, x: prev.x + moveAmount };
        case "right":
          return { ...prev, x: prev.x - moveAmount };
        default:
          return prev;
      }
    });
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 140;
    container.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={sectionRef} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-3 gap-1">
          {/* Left */}
          <div className="bg-gray-300 md:row-span-2 lg:row-span-1">
            <div className="h-126 md:h-screen lg:h-screen relative">
              {product.colors.map((color: any, index: number) => (
                <img
                  key={index}
                  src={color.bgImg}
                  className={`h-126 md:h-full w-full object-cover absolute inset-0 cursor-pointer ${
                    activeColorIndex === index
                      ? "opacity-100"
                      : activeColorIndex === null && index === 0
                        ? "opacity-100"
                        : "opacity-0"
                  } transition-opacity duration-500`}
                  alt=""
                  onClick={() => handleImageClick(color.bgImg, index)}
                />
              ))}
            </div>
          </div>

          <div className="md:relative lg:row-span-1">
            <div
              ref={imageListRef}
              className="h-fit md:h-screen lg:h-screen flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-scroll lg:overflow-y-scroll scrollbar-hide"
              style={{
                overscrollBehavior: "none", // ⭐ Prevent scroll chaining
                touchAction: "pan-y", // ⭐ Only allow vertical scroll
              }}
            >
              {product.colors.map((color: any, index: number) => (
                <img
                  key={index}
                  src={color.bgImg}
                  className="h-40 w-32 md:h-84 md:w-full lg:h-160 lg:w-full object-cover bg-gray-300 shrink-0 cursor-pointer transition-opacity"
                  alt=""
                  onClick={() => handleImageClick(color.bgImg, index)}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="h-full md:h-screen lg:h-screen flex flex-col">
              <div
                ref={detailRef}
                className="flex-1 overflow-y-auto scrollbar-hide py-8 px-4 md:px-10"
                style={{
                  overscrollBehavior: "none",
                  touchAction: "pan-y",
                }}
              >
                <div>
                  <h1 className="font-bold text-lg font-rubik cursor-pointer hover:text-gray-400">
                    {product.title}
                  </h1>

                  <p className="text-xl font-bold leading-9 font-inter">
                    ${product.price.toLocaleString()} USD
                  </p>
                  <p className="text-xs font-medium text-gray-800">
                    Taxes included. <span className="underline">Shipping</span>{" "}
                    calculated at checkout.
                  </p>
                </div>

                <Separator className="my-5" />

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">
                    COLOR:{" "}
                    {product.colors[activeColorIndex].label.toUpperCase()}
                  </p>

                  <div className="flex items-center gap-1.5 py-1 max-w-full">
                    {product.colors.map((color: any, index: number) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className={`bg-gray-400 cursor-pointer rounded-sm shrink-0 transition-all ${
                              activeColorIndex === index
                                ? "border-2 border-black scale-110"
                                : "border border-gray-300 hover:border-gray-500"
                            }`}
                            onClick={() => handleColorClick(color.bgImg, index)}
                          >
                            <img
                              src={color.bgImg}
                              className="w-10 h-11 md:w-13 md:h-14 object-cover rounded-sm"
                              alt=""
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white">{color.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">
                    SIZE: {selectedSize}
                  </p>

                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 text-[10px] border rounded transition-colors ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:bg-black hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">Quantity</p>

                  <div className="w-fit flex items-center justify-start gap-8 border border-black px-4 py-2.5 rounded-sm">
                    <FaMinus
                      size={14}
                      className={`cursor-pointer ${
                        quantity === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black hover:text-gray-600"
                      }`}
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    />

                    <p className="font-medium">{quantity}</p>

                    <FaPlus
                      size={14}
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <FaCheck className="p-1 text-white bg-green-600 rounded-full" />
                  <p className="text-xs">30 in stock</p>
                </div>

                <div className="my-5 bg-cyan-50 p-2 border border-gray-300 flex flex-col md:flex-row items-start justify-between lg:justify-evenly gap-4">
                  <div className="flex items-center gap-4">
                    <LuBox size={22} className="shrink-0" />
                    <div>
                      <p className="font-medium text-xs">
                        Pickup available at Pakis Warehouse
                      </p>
                      <p className="text-xs">Usually ready in 24 hours</p>
                    </div>
                  </div>

                  <p className="text-xs underline text-start md:text-end">
                    Check availability at other stores
                  </p>
                </div>

                <div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <LiaShippingFastSolid size={20} />
                    <p className="text-xs">
                      Free delivery on February 7th - 13th
                    </p>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="hidden md:block h-6 w-px bg-gray-400"
                  />

                  <div className="flex items-center gap-2">
                    <BsBoxSeam />
                    <p className="text-xs">Free + easy returns</p>
                  </div>
                </div>

                <div className="my-5 flex flex-col md:flex-row items-start md:items-center gap-3">
                  <p className="font-rubik font-bold text-xs">Social: </p>
                  <div className="flex items-center gap-3">
                    <FaFacebookF
                      size={34}
                      className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
                    />
                    <FaXTwitter
                      size={34}
                      className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
                    />
                    <FaTelegramPlane
                      size={34}
                      className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
                    />
                    <FaPinterest
                      size={34}
                      className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
                    />
                    <FaWhatsapp
                      size={34}
                      className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
                    />
                  </div>
                </div>

                <div className="my-4">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                      Add to cart
                    </button>

                    <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                      Buy it now
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-rubik font-bold text-xs md:text-sm">
                      PAIRS WELL WITH
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded-full transition-colors ${
                          !canScrollLeft
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                        }`}
                      >
                        <IoIosArrowBack size={18} />
                      </button>

                      <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded-full transition-colors ${
                          !canScrollRight
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                        }`}
                      >
                        <IoIosArrowForward size={18} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex items-center gap-2 overflow-x-scroll scrollbar-hide"
                  >
                    {relatedProducts.map((item) => (
                      <div
                        key={item.id}
                        className="w-31 sm:w-50 md:w-60 lg:w-33 shrink-0 space-y-2 text-center cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={item.images.hover}
                          className="w-31 sm:w-50 md:w-60 lg:w-33 h-32 sm:h-50 md:h-60 lg:h-35 object-cover rounded-xl md:rounded-3xl bg-gray-300"
                          alt={item.title}
                        />
                        <h1 className="text-xs font-semibold font-rubik">
                          {item.title}
                        </h1>
                        <p className="text-xs font-rubik">
                          ${item.price.toLocaleString()} USD
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-0 h-screen rounded-none max-w-screen! w-screen! border-0 overflow-hidden">
          <div className="relative w-full h-full bg-white overflow-hidden">
            <button
              onClick={handlePrevImage}
              disabled={slideDirection !== null}
              className={`absolute left-7 top-1/2 -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all z-20 disabled:opacity-50 ${
                menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <IoIosArrowBack size={18} />
            </button>

            <button
              onClick={handleNextImage}
              disabled={slideDirection !== null}
              className={`absolute right-7 top-1/2 -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all z-20 disabled:opacity-50 ${
                menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <IoIosArrowForward size={18} />
            </button>

            <div
              className={`absolute left-7 bottom-7 text-white transition-all duration-300 z-20 overflow-hidden ${
                menuOpen
                  ? "bg-gray-300 rounded-full p-2 flex flex-col gap-2"
                  : "rounded-full bg-black"
              }`}
            >
              <div
                className={`transition-all duration-300 flex flex-col gap-2 ${
                  menuOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <button
                  onClick={() => handleMove("right")}
                  disabled={!isZoomed}
                  className={`p-4 rounded-full transition-colors ${
                    isZoomed
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IoMdArrowForward size={18} />
                </button>
                <button
                  onClick={() => handleMove("left")}
                  disabled={!isZoomed}
                  className={`p-4 rounded-full transition-colors ${
                    isZoomed
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IoMdArrowBack size={18} />
                </button>
                <button
                  onClick={() => handleMove("down")}
                  disabled={!isZoomed}
                  className={`p-4 rounded-full transition-colors ${
                    isZoomed
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IoMdArrowDown size={18} />
                </button>
                <button
                  onClick={() => handleMove("up")}
                  disabled={!isZoomed}
                  className={`p-4 rounded-full transition-colors ${
                    isZoomed
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IoMdArrowUp size={18} />
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className={`p-4 rounded-full transition-colors ${
                    zoom > 1
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaSearchMinus size={18} />
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className={`p-4 rounded-full transition-colors ${
                    zoom < 3
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaSearchPlus size={18} />
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-4 rounded-full bg-black hover:bg-gray-800 transition-colors"
              >
                {menuOpen ? (
                  <IoClose size={18} />
                ) : (
                  <RxHamburgerMenu size={18} />
                )}
              </button>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              }}
            >
              <div className="w-full h-3/5 md:w-screen md:h-screen lg:w-[38%] lg:h-full relative">
                <img
                  key={dialogImageIndex}
                  src={dialogImage}
                  className={`absolute inset-0 w-full h-full object-cover bg-gray-300 transition-transform duration-500 ease-in-out ${
                    slideDirection === "left"
                      ? "-translate-x-[calc(100%+50vw)]"
                      : slideDirection === "right"
                        ? "translate-x-[calc(100%+50vw)]"
                        : "translate-x-0"
                  }`}
                  alt="Full size preview"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
