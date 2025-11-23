"use client";
import "@/styles/HeroSection.css";
import Image from "next/image";
import ProductCard from "../products/ProductCard";
import error from "next/error";
import Shimmer from "./Shemmier";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ProductType } from "@/types/product";
import { useDataTable } from "@/hooks/useDataTable";
import { useDataSelect } from "@/hooks/useDataSelect";
import { HeroSectionType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";

interface UseDataSelectProps {
  data: ProductType[];
}

const HeroSection: React.FC = () => {
  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
  } = useDataTable<HeroSectionType>("HeroSection");

  const { data: productsData } = useDataSelect<UseDataSelectProps>("products");
  const locale = useSelector((state: RootState) => state.locale.value);
  const [activeIndex, setActiveIndex] = useState(0);
  if (heroLoading)
    return (
      <Shimmer
        count={1}
        width="w-[80%]"
        height="h-96"
        rounded="rounded"
        backGroundColor="bg-neutral-300"
      />
    );
  if (heroError) return <p>Error: {String(error)}</p>;

  return (
    <div className="Hero-section p-10 text-center relative min-h-[600px]">
      {/* Main Hero Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        speed={1000}
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full rounded-2xl"
      >
        {heroData?.map((item) => (
          <SwiperSlide key={item.id} className="relative h-full">
            {item.mediaType === "video" ? (
              <video
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                width={1920}
                height={1080}
                src={item.image || "/fallback.jpg"}
                alt={item.title.en}
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
            <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
              <h2 className="text-white text-4xl md:text-6xl font-bold">
                {item.title[locale]}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Cards Swiper - Positioned on top */}
      <div className="absolute top-[45%] right-10 -translate-y-1/2 z-20 w-80 max-w-[90%]">
        <AnimatePresence mode="wait">
          {productsData[0]?.data?.map(
            (item, index) =>
              index === activeIndex && (
                <motion.div
                  key={item.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: [100, 0, -8, 0, -5, 0, -8, 0],
                    opacity: 1,
                  }}
                  exit={{
                    y: -100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "backOut",
                    y: {
                      duration: 0.8,
                      times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                    },
                  }}
                >
                  <ProductCard data={item} />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
      <div className="w-[95%] m-auto h-px bg-neutral-300 relative bottom-20 z-10"></div>
    </div>
  );
};

export default HeroSection;
