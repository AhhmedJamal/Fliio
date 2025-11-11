"use client";

import { useDataTable } from "@/hooks/useDataTable";
import { HeroSectionType } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const { data, loading, error } = useDataTable<HeroSectionType>("HeroSection");
  const t = useTranslations("HeroSection");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div className="p-10 text-center">
      {data?.map((item) => (
        <div key={item.id} className="slide-item">
          {item.mediaType === "video" ? (
            <video src={item.video} controls className="mx-auto rounded-2xl" />
          ) : (
            <Image  
              width={500}
              height={500}
              src={item.image || "/fallback.jpg"}
              alt={item.title.en}
              className="mx-auto rounded-2xl"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
