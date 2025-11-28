import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Search } from "lucide-react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { VisuallyHidden } from "../ui/visually-hidden";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchLink() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <>
      <Sheet open={isOpenSearch} onOpenChange={setIsOpenSearch}>
        <SheetTrigger asChild>
          <button className="text-white border-none hover:bg-gray-900 p-2 rounded-full flex items-center justify-center">
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
              <div className="ml-28 mt-20 w-1/2">
                <ScrollArea>
                  <div className="flex items-start">
                    <Input
                      type="text"
                      className="border rounded-none w-full h-12 text-3xl! placeholder:text-3xl px-0!"
                      placeholder="Search"
                    />
                    <IoSearchOutline className="w-6 h-6"/>
                  </div>
                </ScrollArea>
              </div>
              <div className="w-3/8 fixed top-0 right-0 h-full bg-white px-10 py-10 rounded-3xl">
                <div className="flex flex-col">
                  <div className="">
                    <h1 className="text-5xl font-medium font-rubik">
                      POPULAR COLLECTIONS
                    </h1>
                  </div>
                  <div className="">
                    <Link href="" className=""></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
