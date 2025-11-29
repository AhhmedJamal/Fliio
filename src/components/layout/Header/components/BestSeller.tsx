"use client";
import ProductCard from "@/components/shared/ProductCard";
import useFilters from "@/hooks/useFilters";
import { ProductType } from "@/types/product";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import ButtonArrow from "@/components/ui/ButtonArrow";

const BestSeller = () => {
  const { data, loading, error } = useFilters<ProductType>({
    columnName: "reviewsCount",
    minMax: { min: 120 },
  });
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <ButtonArrow
      swiperRef={swiperRef}
      isChildren={true}
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
        breakpoints={{
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
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
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
    </ButtonArrow>
  );
};

export default BestSeller;
