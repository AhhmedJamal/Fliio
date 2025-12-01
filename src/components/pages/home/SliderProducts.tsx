"use client";
import ProductCard from "@/components/shared/ProductCard";
import ButtonArrow from "@/components/ui/ButtonArrow";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { Swiper as SwiperType } from "swiper";
import {
  A11y,
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SliderProductsType {
  id: number;
  title: {
    en: string;
    fr: string;
    es: string;
  };
  typeProducts: string;
  image: string;
  video: string;
  isVideo: boolean;
}
const SliderProducts = () => {
  const { data: dataSlider, loading } =
    useDataTable<SliderProductsType>("sliderProducts");
  const { data: products } = useDataTable<ProductType>("products");
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useSelector((state: RootState) => state.locale.value);
  const [titleSlider, setTitleSlider] = useState("");

  if (loading) return <p>loading...</p>;
  return (
    <div>
      <ButtonArrow swiperRef={swiperRef} title={dataSlider[0].title[locale]} />
      <div className="flex ">
        {dataSlider[0].isVideo ? (
          <video></video>
        ) : (
          <Image
            src={dataSlider[0].image}
            alt={dataSlider[0].title[locale]}
            width={100}
            height={100}
            className="size-72 object-cover"
          />
        )}
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
          }}
          className="mt-3"
        >
          {dataSlider.map((item) => {
            return (
              <div key={item.id}>
                {products.map((product, i) => {
                  return (
                    <SwiperSlide key={product.id + "-" + i}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  );
                })}
              </div>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderProducts;
