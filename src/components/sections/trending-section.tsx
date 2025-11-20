import { FaPlus } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TrendingSection() {
  return (
    <div className="bg-white flex items-center justify-start gap-6 p-6">
      <div className="max-w-36 space-y-3.5">
        <div className="bg-gray-400 w-fit border border-gray-500 rounded-3xl relative overflow-hidden group">
          <img
            src="https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=691fdeb5&is=691e8d35&hm=cdf12fb111b7f6068bfceaa4fc40297800128f89ce26b8ce4dea0fa4d5854c1b&=&format=webp&quality=lossless"
            className="w-36 h-46 object-cover rounded-3xl
              transition-all duration-700 ease-out
              group-hover:opacity-0 group-hover:scale-105"
            alt=""
          />
          <img
            src="https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=691ff1ce&is=691ea04e&hm=843bdedf9b811b163b3b0546d8601025bfc1adc64b24f362bae20a2954746f75&=&format=webp&quality=lossless"
            className="w-36 h-46 object-cover rounded-3xl
              absolute inset-0 opacity-0
              transition-all duration-700 ease-out
              group-hover:opacity-100 group-hover:scale-105"
            alt=""
          />
          <div
            className="absolute inset-0 flex items-end justify-center
            text-black text-[10px] font-medium font-inter
            opacity-0 translate-y-full
            transition-all duration-400 ease-out
            group-hover:opacity-100 group-hover:translate-y-0"
          >
            <div className="w-30 group/quickview transition-all duration-300 ease-out group-hover/quickview:-translate-y-16">
              <div className="flex items-center justify-between gap-2 mt- py-2 px-3 rounded-t-lg bg-gray-100 cursor-pointer">
                <h1 className="-mb-2">QUICK VIEW</h1>
                <FaPlus className="-mb-2" />
              </div>

              <div className="bg-gray-100 rounded-b-lg px-3 pb-2 max-h-0 transition-all duration-800 ease-out group-hover/quickview:max-h-20 group-hover/quickview:mb-2">
                <div className="pt-2">
                  <Separator className="mb-3" />
                  <div className="flex gap-1.5 flex-wrap">
                    {["S", "M", "L"].map((size) => (
                      <button
                        key={size}
                        className="px-2 py-1 text-[10px] border border-gray-300 rounded hover:bg-black hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center px-1.5 space-y-1.5 font-inter group/info relative">
          <div className="transition-all space-y-1.5 duration-300 ease-out group-hover/info:opacity-0">
            <h1 className="text-xs text-wrap font-semibold">
              Full Sleeve Round Neck T-shirt
            </h1>
            <p className="text-xs">$4,400.00 USD</p>
          </div>

          <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-1.5 opacity-0 transition-all duration-300 ease-out group-hover/info:opacity-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-gray-400 border border-gray-300 cursor-pointer">
                  <img
                    src="https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=691ff1ce&is=691ea04e&hm=843bdedf9b811b163b3b0546d8601025bfc1adc64b24f362bae20a2954746f75&=&format=webp&quality=lossless"
                    className="w-8 h-8 object-cover"
                    alt=""
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Red</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-gray-400 border border-gray-300 cursor-pointer">
                  <img
                    src="https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=691ff1ce&is=691ea04e&hm=843bdedf9b811b163b3b0546d8601025bfc1adc64b24f362bae20a2954746f75&=&format=webp&quality=lossless"
                    className="w-8 h-8 object-cover"
                    alt=""
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Red</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-gray-400 border border-gray-300 cursor-pointer">
                  <img
                    src="https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=691ff1ce&is=691ea04e&hm=843bdedf9b811b163b3b0546d8601025bfc1adc64b24f362bae20a2954746f75&=&format=webp&quality=lossless"
                    className="w-8 h-8 object-cover"
                    alt=""
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Red</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-gray-400 border border-gray-300 cursor-pointer">
                  <img
                    src="https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=691ff1ce&is=691ea04e&hm=843bdedf9b811b163b3b0546d8601025bfc1adc64b24f362bae20a2954746f75&=&format=webp&quality=lossless"
                    className="w-8 h-8 object-cover"
                    alt=""
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Red</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
