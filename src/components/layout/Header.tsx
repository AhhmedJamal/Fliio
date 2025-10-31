"use client";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Audiowide } from "next/font/google";
import { FaRegUser } from "react-icons/fa";
import SlideTextTop from "../ui/SlideTextTop";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import ModalHeader from "../shared/ModalHeader";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const Header = () => {
  const t = useTranslations("Header");
  const [isValue, setIsValue] = useState<string>("");
  const selectValue: string[] = ["en", "ar", "fr", "gr"];
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const navLinks = [
    { label: t("shopByCategory") },
    { label: t("pages") },
    { label: t("bestSellers") },
    { label: t("newArrivals") },
    { label: t("homeAppliances") },
    { label: t("audioGames") },
  ];
  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);

    if (
      segments.length > 0 &&
      selectValue.some((lang) => lang === segments[0])
    ) {
      segments.shift();
    }

    const newPath = `/${newLocale}${
      segments.length > 0 ? `/${segments.join("/")}` : ""
    }`;

    router.push(newPath);
    router.refresh();
  };

  return (
    <>
      <SlideTextTop />
      <header
        dir="ltr"
        className="header  p-4 shadow-md dark:bg-gray-800  bg-(--text) text-background "
      >
        <div className="container flex justify-between items-center mx-auto">
          <div className="logo">
            <h1 className={`${audiowide.className} text-5xl `}>Fliio</h1>
          </div>
          <div className="input-search bg-background text-(--text) border h-10 w-[40%] md:w-[50%] rounded-full flex rtl:flex-row-reverse items-center px-4 justify-between">
            <input
              className="focus:outline-none placeholder:text-[12px] text-[12px] w-full ltr:text-left rtl:text-right "
              placeholder={t("inputSearch")}
              type="search"
              onChange={(e) => setIsValue(e.target.value)}
              onKeyUp={() => {
                console.log("kye: " + isValue);
              }}
            />
            <FiSearch size={20} />
          </div>
          <div className="icons flex items-center gap-2">
            <FaRegUser
              key="user-icon"
              size={20}
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <RiShoppingCartLine
              key="cart-icon"
              size={23}
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <Select value={currentLocale} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="w-[45px] border-none h-7 ml-1"
                style={{
                  boxShadow: "none",
                  padding: "0",
                  width: "fit-content",
                  gap: 0,
                  marginTop: "2px",
                }}
              >
                <SelectValue placeholder="en" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectValue.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <nav className="container mx-auto mt-4">
          <ul className="flex gap-x-2 justify-between flex-wrap ">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="flex items-center gap-1 group hover:cursor-pointer duration-200 relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-neutral-400 transition-all hover:text-neutral-300 hover:before:w-full before:transition-all before:duration-300"
              >
                {link.label}{" "}
                <IoIosArrowDown className="group-hover:-rotate-90 transition-all duration-300" />
              </li>
            ))}
          </ul>
        </nav>
        <ModalHeader />
      </header>
    </>
  );
};

export default Header;
