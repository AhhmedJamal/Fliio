"use client";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import Shimmer from "./Shemmier";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { useRef } from "react";

interface CategoriesProps {
  id: string;
  name: {
    en: string;
    fr: string;
    es: string;
  };
  image: string;
  link: string;
}
const Categories = () => {
  const { data, loading } = useDataTable<CategoriesProps>("categories");
  const locale = useSelector((state: RootState) => state.locale.value);
  const swiperRef = useRef<SwiperType | null>(null);
  if (loading)
    return (
      <div className="grid grid-cols-[5%_88%_5%] gap-4 my-6 container mx-auto">
        <Shimmer className="size-[50px]  rounded-full " />
        <div className="">
          <Shimmer count={5} className="h-[200px] w-full my-2 rounded" />
          <Shimmer count={5} className="h-5 w-full rounded mr-16" />
        </div>
        <Shimmer className="size-[50px]  rounded-full" />
      </div>
    );
  return (
    <div className="flex items-center justify-center gap-4 container mx-auto">
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
        className=" p-3 rounded-full transition-all duration-300 hover:scale-110 group bg-primary"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-white text-3xl group-hover:text-neutral-300 transition-colors rtl:rotate-180" />
      </motion.button>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        slidesPerView={5}
        spaceBetween={10}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="categories mb-6 container"
      >
        {data?.map((category, i) => (
          <SwiperSlide key={category.id}>
            <motion.div
              className="hover:scale-95 transition-all duration-300 bg-white rounded-lg hover:shadow-md p-2 group my-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.5, duration: 0.5 }}
            >
              <Link href={category.link}>
                <Image
                  src={category.image}
                  height={200}
                  width={200}
                  alt={category.name[locale as keyof typeof category.name]}
                  className="w-full h-[200px] object-cover mb-2 rounded"
                />
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-lg font-medium">
                    {category.name[locale as keyof typeof category.name]}
                  </h3>
                  <FaChevronRight className="text-black text-xl group-hover:text-neutral-600 transition-colors rtl:rotate-180 " />
                </div>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
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
        className="p-3 rounded-full transition-all duration-300 group bg-primary"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-white text-3xl group-hover:text-neutral-300 transition-colors rtl:rotate-180" />
      </motion.button>
    </div>
  );
};

export default Categories;
