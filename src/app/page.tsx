import AdvantageSection from "@/components/sections/advantage-section";
import BundleSection from "@/components/sections/bundle-section";
import StyleSection from "@/components/sections/style-section";
import TrendingSection from "@/components/sections/trending-section";

export default function Home() {
  return (
    <>
      <TrendingSection />
      <AdvantageSection />
      <StyleSection />
      <BundleSection />
    </>
  );
}
