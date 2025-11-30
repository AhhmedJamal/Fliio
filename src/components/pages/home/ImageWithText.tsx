"use client";
import Shimmer from "@/components/ui/Shemmier";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import { ImageSquareItem } from "@/types/ImageSquare";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ImageWithText = () => {
  const { data, loading } = useDataTable<ImageSquareItem>("TextImage");

  const locale = useSelector((state: RootState) => state.locale.value);
  if (loading)
    return (
      <div className="flex flex-wrap justify-center gap-4 max-w-[70%] mx-auto my-11">
        <div className="flex items-center justify-center gap-4 w-fit  ">
          <Shimmer className="w-44 h-20 rounded-full " />
          <Shimmer className="w-56 h-6 rounded-full " />
        </div>
        <div className="flex items-center justify-center gap-4 w-fit  ">
          <Shimmer className="w-44 h-20 rounded-full " />
          <Shimmer className="w-56 h-6 rounded-full " />
        </div>
        <div className="flex items-center justify-center gap-4 w-fit  ">
          <Shimmer className="w-44 h-20 rounded-full " />
          <Shimmer className="w-56 h-6 rounded-full " />
        </div>
      </div>
    );
  return (
    <div className="flex items-center justify-center flex-wrap max-w-[70%] mx-auto my-11">
      {data.map((item) => {
        return (
          <div key={item.id} className="flex items-center gap-4">
            <p className="text-4xl">{item.text[locale]}</p>
            {item.image && (
              <Image
                src={item.image || ""}
                alt={item.text.en || ""}
                height={150}
                width={150}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageWithText;
