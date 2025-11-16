"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";
import { useDataTable } from "@/hooks/useDataTable";
import { HeroSectionType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductType } from "@/types/product";

const HeroSection: React.FC = () => {
  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
  } = useDataTable<HeroSectionType>("HeroSection");

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useDataTable<ProductType>("products");
  console.log(productsData[0]);

  const [mainSwiper, setMainSwiper] = useState<Swiper | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<Swiper | null>(null);
  const locale = useSelector((state: RootState) => state.locale.value);
  if (heroLoading) return <p>Loading...</p>;
  if (heroError) return <p>Error: {String(error)}</p>;

  return (
    <div className="p-10 text-center relative">
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
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={setThumbSwiper}
        controller={{ control: mainSwiper }}
        onSlideChange={() => console.log("slide change")}
      >
        {productsData?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="slide-item- h-full"
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
