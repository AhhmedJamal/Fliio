"use client";
import "@/styles/HeroSection.css";
import Image from "next/image";
import ProductCard from "../products/ProductCard";
import error from "next/error";
import Shimmer from "./Shemmier";
import { useState, useRef } from "react";
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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";
import ButtonLink from "./ButtonLink";

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
  const swiperRef = useRef<SwiperType | null>(null);
  const t = useTranslations("HeroSection");
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
    <div className="Hero-section max-w-280 md:container mx-auto my-4 text-center relative h-[600px] md:h-[650px]">
      {/* Main Hero Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        speed={1000}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full rounded-2xl"
      >
        {heroData?.map((item, idx) => (
          <SwiperSlide key={item.id} className="relative h-full">
            {item.mediaType === "video" ? (
              <motion.video
                key={`video-${item.id}`}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 1, ease: "backIn" }}
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              >
                <source src={item.video} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key={`image-${item.id}`}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  width={1920}
                  height={1080}
                  src={item.image || "/fallback.jpg"}
                  alt={item.title.en}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            )}
            <div className="absolute pt-12 px-9 inset-0 h-[90%] rounded-2xl flex justify-between flex-row ">
              <motion.div
                key={
                  idx === activeIndex
                    ? `content-active-${item.id}`
                    : `content-${item.id}`
                }
                className="flex flex-col items-start gap-12 max-w-1/3 overflow-hidden"
              >
                <motion.p
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "backOut" }}
                  className="text-white"
                >
                  {t("featuredItems")}
                </motion.p>
                <motion.h2
                  initial={{ y: -150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
                  className="text-white text-4xl md:text-5xl font-bold text-left"
                >
                  {item.title[locale]}
                </motion.h2>
                <ButtonLink is_dark={false} link="" styles="px-9 py-1 w-fit">
                  {t("shopNow")}
                </ButtonLink>
              </motion.div>
              {/* Product Cards Swiper - Positioned on top */}
              <div className=" z-20 w-56 md:w-72">
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
                          <ProductCard product={item} />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute  bottom-2 px-[38px] gap-5 left-5 right-5 flex items-center justify-center z-10">
        {/* Left  Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className=" p-3 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-white text-2xl group-hover:text-neutral-300 transition-colors" />
        </button>
        {/* Custom Pagination */}
        <div className="  backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="font-semibold text-lg text-white">
            {activeIndex + 1} / {heroData?.length || 0}
          </span>
        </div>
        {/* Right Navigation*/}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className=" p-3 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-white text-2xl group-hover:text-neutral-300 transition-colors" />
        </button>
      </div>
      <div className="w-[95%] m-auto h-px bg-neutral-300 relative bottom-16 z-10"></div>
    </div>
  );
};

export default HeroSection;
