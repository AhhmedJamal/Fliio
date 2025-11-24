import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSection from "@/components/ui/HeroSection";
import Categories from "@/components/ui/Categories";

export default function HomePage() {
  return (
    <div className="main-page">
      <HeroSection />
      <Categories />
    </div>
  );
}
