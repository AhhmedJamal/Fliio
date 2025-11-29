"use client";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import Shimmer from "../../ui/Shemmier";
import { FaChevronRight } from "react-icons/fa";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper/modules";
import { useRef, useState } from "react";
import ButtonArrow from "@/components/ui/ButtonArrow";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  if (loading) return shimmer();
  return (
    <div className="fle md:items-center justify-center md:flex-row flex-col gap-2 md:gap-4 px-2 container my-6 mx-auto">
      <ButtonArrow
        isChildren={true}
        swiperRef={swiperRef}
        isBeginning={isBeginning}
        isEnd={isEnd}
      >
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Controller,
            Autoplay,
          ]}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 6 },
          }}
          spaceBetween={10}
          loop={false}
          speed={700}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setTimeout(() => setIsInitialLoad(false), 1000);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="categories mb-6 container"
        >
          {data?.map((category, i) => (
            <SwiperSlide key={category.id}>
              <motion.div
                key={category.id || `item-${i}`}
                className="bg-white rounded-lg transition-shadow hover:shadow-md p-2 group my-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale:
                    hoveredIndex === null
                      ? 1
                      : hoveredIndex === i
                      ? 1.02
                      : 0.95,
                  filter:
                    hoveredIndex === null
                      ? "blur(0px)"
                      : hoveredIndex === i
                      ? "blur(0px)"
                      : "blur(2px)",
                }}
                transition={{
                  duration: 0.3,
                  delay: isInitialLoad ? 0.2 * i : 0,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={category.link}>
                  <Image
                    src={category.image}
                    height={200}
                    width={200}
                    alt={category.name[locale as keyof typeof category.name]}
                    className="w-full h-[200px] object-cover mb-2 rounded group-hover:scale-110 transition-all duration-300"
                  />
                  <div className="flex justify-between items-center px-2">
                    <h3 className="text-lg font-medium">
                      {category.name[locale as keyof typeof category.name]}
                    </h3>
                    <FaChevronRight
                      size={15}
                      className="text-black group-hover:text-neutral-600 group-hover:rotate-90 transition-all rtl:rotate-180 border border-neutral-400 rounded-full size-6 p-1.5"
                    />
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ButtonArrow>
    </div>
  );
};

export default Categories;

const shimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[50px_auto_50px] md:gap-4 my-6 px-2 container mx-auto">
      <Shimmer className="size-[50px] rounded-full md:block hidden" />
      <div>
        <div className="flex items-center gap-2 w-fit mb-3">
          <Shimmer className="size-[50px] rounded-full md:hidden" />
          <Shimmer className="size-[50px] rounded-full md:hidden" />
        </div>
        {/* image */}
        <Shimmer
          count={2}
          className="h-[200px] w-full my-2 rounded block md:hidden lg:hidden" // small only
        />
        <Shimmer
          count={3}
          className="h-[200px] w-full my-2 rounded hidden md:block lg:hidden" // md only
        />
        <Shimmer
          count={4}
          className="h-[200px] w-full my-2 rounded hidden lg:block xl:hidden" // lg and up
        />
        <Shimmer
          count={5}
          className="h-[200px] w-full my-2 rounded hidden xl:block" // xl and up
        />

        {/* text */}
        <Shimmer
          count={2}
          className="h-5 w-full rounded mr-16 block md:hidden lg:hidden" // small only
        />
        <Shimmer
          count={3}
          className="h-5 w-full rounded mr-16 hidden md:block lg:hidden" // md only
        />
        <Shimmer
          count={4}
          className="h-5 w-full rounded mr-16 hidden lg:block xl:hidden" // lg and up
        />
        <Shimmer
          count={5}
          className="h-5 w-full rounded mr-16 hidden xl:block" // xl and up
        />
      </div>

      <Shimmer className="size-[50px] rounded-full md:block hidden" />
    </div>
  );
};
