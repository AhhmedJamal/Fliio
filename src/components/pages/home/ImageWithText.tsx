"use client";
import Shimmer from "@/components/ui/Shemmier";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import { ImageSquareItem } from "@/types/ImageSquare";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

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
    <div className="flex items-center justify-center flex-wrap gap-1 md:gap-4 md:max-w-[70%] mx-auto my-10">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <p className="text-2xl md:text-4xl">{item.text[locale]}</p>
          {item.image && (
            <motion.div
              whileHover={{
                scale: [1, 1.1, 1.05],
                x: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-20 md:w-36  relative"
            >
              <Image
                src={item.image || ""}
                alt={item.text.en || ""}
                height={100}
                width={100}
                className="w-20 md:w-36"
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageWithText;
