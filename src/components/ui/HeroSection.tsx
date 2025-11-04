"use clint"
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const HeroSection = () => {
  
  useEffect(()=>{

  },[])
  const t = useTranslations("HeroSection");
  return <div className="p-10 text-center">{t("welcomeMessage")}</div>;
};

export default HeroSection;
