"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Audiowide } from "next/font/google";
import { FaRegUser } from "react-icons/fa";
import SlideTextTop from "@/components/ui/SlideTextTop";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import NavMenu from "./NavMenu";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const Header = () => {
  const t = useTranslations("Header");
  const [isValue, setIsValue] = useState<string>("");
  const selectValue: string[] = ["en", "ar", "de"];
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

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
        className="header relative p-4 pb-0 shadow-md dark:bg-gray-800  bg-(--text) text-background z-20"
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
        <NavMenu />
      </header>
    </>
  );
};

export default Header;
