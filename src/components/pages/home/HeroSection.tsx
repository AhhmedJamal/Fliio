"use client";
import "@/styles/HeroSection.css";
import Image from "next/image";
import ProductCard from "../../shared/ProductCard";
import error from "next/error";
import Shimmer from "../../ui/Shemmier";
import { useState, useRef } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ProductType } from "@/types/product";
import { useDataTable } from "@/hooks/useDataTable";
import { useDataSelect } from "@/hooks/useDataSelect";
import { HeroSectionType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";
import ButtonLink from "../../ui/ButtonLink";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";

const HeroSection: React.FC = () => {
  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
  } = useDataTable<HeroSectionType>("HeroSection");
  const { data: productsData } = useDataSelect<ProductType>("products");
  const locale = useSelector((state: RootState) => state.locale.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const t = useTranslations("HeroSection");
  if (heroLoading)
    return (
      <Shimmer className="h-[600px] md:h-[650px] w-full md my-4 mx-2 rounded-2xl" />
    );
  if (heroError) return <p>Error: {String(error)}</p>;

  return (
    <div className="Hero-section max-w-280 md:container md:mx-auto my-4 mx-3 text-center relative h-screen md:h-[650px]">
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
                initial={{ scale: 1 }}
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
                  quality={100}
                  src={item.image || "/fallback.jpg"}
                  alt={item.title.en}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            )}
            <div className="absolute md:pt-12 px-2 md:px-9 flex-col gap-0 pt-5 inset-0 h-screen md:h-[90%] rounded-2xl flex justify-between md:flex-row items-end md:items-center">
              <motion.div
                key={
                  idx === activeIndex
                    ? `content-active-${item.id}`
                    : `content-${item.id}`
                }
                className="flex flex-col items-start md:gap-12 w-full md:max-w-1/3 max-w-[unset] gap-3 h-[30%] md:h-full overflow-hidden"
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
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left line-clamp-3"
                >
                  {item.title[locale]}
                </motion.h2>
                <ButtonLink is_dark={false} link="" styles="px-9 py-1 w-fit">
                  {t("shopNow")}
                </ButtonLink>
              </motion.div>
              {/* Product Cards Swiper - Positioned on top */}
              <div className=" z-20 w-56 md:w-80 h-[70%] mb-5 md:h-full">
                <AnimatePresence mode="wait">
                  {productsData?.map(
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

      <div className="absolute bottom-1 gap-10 w-full flex items-center justify-center z-10">
        {/* Left  Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className=" p-3 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-white text-3xl group-hover:text-neutral-300 transition-colors rtl:rotate-180" />
        </button>
        {/* Custom Pagination */}
        <div className="  backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="font-semibold text-xl text-white">
            {activeIndex + 1} / {heroData?.length || 0}
          </span>
        </div>
        {/* Right Navigation*/}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className=" p-3 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-white text-3xl group-hover:text-neutral-300 transition-colors rtl:rotate-180" />
        </button>
      </div>
      <div className="w-[95%] m-auto h-px bg-neutral-300 relative bottom-16 z-10"></div>
    </div>
  );
};

export default HeroSection;
