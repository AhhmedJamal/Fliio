import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  return <div className="p-10 text-center">{t("welcomeMessage")}</div>;
};

export default HeroSection;
