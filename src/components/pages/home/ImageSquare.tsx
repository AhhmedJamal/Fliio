"use client";
import ButtonLink from "@/components/ui/ButtonLink";
import { useDataTable } from "@/hooks/useDataTable";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Shimmer from "@/components/ui/Shemmier";

type ImageSquareItem = {
  id: number;
  image: string;
  url?: string;
  title?: {
    ar?: string;
    en?: string;
    de?: string;
  };

  supTitle?: {
    ar?: string;
    en?: string;
    de?: string;
  };
  textLink?: {
    ar?: string;
    en?: string;
    de?: string;
  };
};

const ImageSquare: React.FC = () => {
  const { data, loading } = useDataTable<ImageSquareItem>("ImageSquare");
  const locale = useSelector((state: RootState) => state.locale.value) || "en";

  if (loading) return ShimmerImages();
  if (!data || !Array.isArray(data) || data.length === 0)
    return <p>No items</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen md:h-[550px] gap-2 container mx-auto px-2">
      {data.map((item) => {
        const title = item.title?.[locale] ?? item.title?.en ?? "";
        const subTitle = item.supTitle?.[locale] ?? item.supTitle?.en ?? "";
        const textLink = item.textLink?.[locale] ?? item.textLink?.en ?? "";

        return (
          <div
            key={item.id}
            className={`relative md:h-full rounded-lg  overflow-clip group hover:bg-neutral-950/20 transition-colors duration-300 ${
              item.id == 1 ? "row-[1/3] md:col-[1/3] h-[300px]" : " h-[200px]"
            }`}
          >
            {item.image ? (
              <Image
                src={item.image}
                height={100}
                width={100}
                quality={100}
                alt={title || "image"}
                className="h-full w-full absolute -z-1 object-cover group-hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div style={{ width: 100, height: 100, background: "#eee" }} />
            )}
            <div
              className={`${
                item.id == 1 ? "max-w-[65%] md:max-w-1/2 " : ""
              } mx-5 overflow-clip h-full flex flex-col items-start justify-center`}
            >
              <motion.p
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "backOut",
                  delay: 0.4 * item.id,
                }}
                className="text-white text-3xl md:text-4xl"
              >
                {title}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "backOut",
                  delay: 0.7 * item.id,
                }}
                className="text-white text-sm md:text-base my-"
              >
                {subTitle}
              </motion.p>
              <ButtonLink link="#" styles="p-[6px_28px] top-5" is_dark={false}>
                {textLink}
              </ButtonLink>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageSquare;

const ShimmerImages = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen md:h-[550px] gap-2 container mx-auto px-2">
      <div className="row-[1/3] w-full h-full md:col-[1/3] flex ">
        <Shimmer className="w-full h-full rounded-lg" />
      </div>
      <Shimmer className="w-full h-full rounded-lg" />
      <Shimmer className="w-full h-full rounded-lg" />
    </div>
  );
};
