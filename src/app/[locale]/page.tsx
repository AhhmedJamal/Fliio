import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSection from "@/components/pages/home/HeroSection";
import Categories from "@/components/pages/home/Categories";
import ImageSquare from "@/components/pages/home/ImageSquare";

export default function HomePage() {
  return (
    <div className="main-page mb-72">
      <HeroSection />
      <Categories />
      <ImageSquare />
    </div>
  );
}
