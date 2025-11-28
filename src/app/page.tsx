import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import AdvantageSection from "@/components/sections/advantage-section";
import BundleSection from "@/components/sections/bundle-section";
import FavoriteSection from "@/components/sections/favorite-section";
import GallerySection from "@/components/sections/gallery-section";
import StyleSection from "@/components/sections/style-section";

export default function Home() {
  return (
    <>
      <ScrollSmootherWrapper>
        {/* <AdvantageSection /> */}
        <StyleSection />
        <BundleSection />
        <FavoriteSection />
        <GallerySection/>
      </ScrollSmootherWrapper>
    </>
  );
}
