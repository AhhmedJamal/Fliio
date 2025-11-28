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
import { TbMenu4 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { Audiowide } from "next/font/google";
import { FaRegUser } from "react-icons/fa";
import SlideTextTop from "@/components/ui/SlideTextTop";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import NavMenu from "./NavMenu";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
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
  const locale = useSelector((state: RootState) => state.locale.value);

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
    <div className=" dark:bg-gray-800 bg-(--text) text-background relative  z-50 shadow-md ">
      <SlideTextTop />
      <header dir="ltr" className="header p-4 md:pb-0 ">
        <div className="container flex justify-between items-center mx-auto">
          <div className="logo">
            <h1 className={`${audiowide.className} text-5xl `}>Fliio</h1>
          </div>
          <div className="hidden lg:flex input-search bg-background text-(--text) border h-10 w-[50%] rounded-full  rtl:flex-row-reverse items-center px-4 justify-between">
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
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-200 hidden md:block"
            />
            <RiShoppingCartLine
              key="cart-icon"
              size={23}
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-200 hidden md:block"
            />

            <Select value={locale} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="w-[45px] border-none h-7 ml-1 text-xl md:text-base"
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
            <TbMenu4 size={40} />
          </div>
        </div>
        <div className="input-search bg-background text-(--text) border h-10 w-full mt-3 rounded-full flex md:hidden rtl:flex-row-reverse items-center px-4 justify-between">
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
        <NavMenu />
      </header>
    </div>
  );
};

export default Header;
