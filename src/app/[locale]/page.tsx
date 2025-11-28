import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSection from "@/components/ui/HeroSection";
import Categories from "@/components/ui/Categories";
import ProductList from "@/components/ui/ProductList";

export default function HomePage() {
  return (
    <div className="main-page mb-72">
      <HeroSection />
      <Categories />
      {/* <ProductList /> */}
    </div>
  );
}
