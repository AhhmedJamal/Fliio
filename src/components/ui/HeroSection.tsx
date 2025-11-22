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
import type { Swiper as SwiperType } from "swiper";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";

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
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const locale = useSelector((state: RootState) => state.locale.value);
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
    <div className="Hero-section p-10 text-center relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        speed={1000}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={setMainSwiper}
        controller={{ control: thumbSwiper }}
        onSlideChange={() => console.log("slide change")}
      >
        {heroData?.map((item) => (
          <SwiperSlide key={item.id} className="slide-item- h-full">
            {item.mediaType === "video" ? (
              <video
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                className="mx-auto rounded-2xl h-full w-full"
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                width={500}
                height={500}
                src={item.image || "/fallback.jpg"}
                alt={item.title.en}
                className="mx-auto rounded-2xl h-full w-full"
              />
            )}
            <h2 className="absolute top-1/2 text-white">
              {item.title[locale]}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        onSwiper={setThumbSwiper}
        controller={{ control: mainSwiper }}
        onSlideChange={() => console.log("slide change")}
      >
        {productsData[0]?.data?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="slide-item- h-full absolute top-1/2 right-0 z-20"
          >
            <ProductCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
