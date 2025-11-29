"use client";
import ProductCard from "@/components/products/ProductCard";
import useFilters from "@/hooks/useFilters";
import { ProductType } from "@/types/product";
import { useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  A11y,
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

const BestSeller = () => {
  const { data, loading, error } = useFilters<ProductType>({
    columnName: "reviewsCount",
    minMax: { min: 120 },
  });
  const swiperRef = useRef<SwiperType | null>(null);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="flex items-center">
      {/* Left  Buttons */}
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          x: [0, 0, -20, 10, 10],
          y: [10, -20, 0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => swiperRef.current?.slidePrev()}
        className=" p-3 rounded-full transition-all duration-300 hover:scale-110 bg-primary z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-white text-2xl  transition-colors " />
      </motion.button>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Controller,
          Autoplay,
        ]}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        spaceBetween={8}
        speed={700}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
      >
        {data.map((product, index) => {
          return (
            <SwiperSlide key={`product-${product.id}-${index}`}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* Right Navigation*/}
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          x: [0, 0, -20, 10, 10],
          y: [10, -20, 0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => swiperRef.current?.slideNext()}
        className=" p-3 rounded-full transition-all duration-300 hover:scale-110 bg-primary z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-white text-2xl  transition-colors" />
      </motion.button>
    </div>
  );
};

export default BestSeller;
