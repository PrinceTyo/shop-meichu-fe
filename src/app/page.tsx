import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import AdvantageSection from "@/components/sections/advantage-section";
import BundleSection from "@/components/sections/bundle-section";
import FavoriteSection from "@/components/sections/favorite-section";
import GallerySection from "@/components/sections/gallery-section";
import StyleSection from "@/components/sections/style-section";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <>
      <ScrollSmootherWrapper>
        <HeroSection/>
        <AdvantageSection />
        <AnimatedSection />
        <StyleSection />
        <BundleSection />
        <FavoriteSection />
        <GallerySection/>
      </ScrollSmootherWrapper>
    </>
  );
}
