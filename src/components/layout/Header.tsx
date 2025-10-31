"use client";
import { Audiowide } from "next/font/google";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { TbMoon } from "react-icons/tb";
import SlideTextTop from "../ui/SlideTextTop";
import { useState } from "react";
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const Header = () => {
  const [isValue, setIsValue] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  return (
    <>
      <SlideTextTop />
      <header className="header  p-4 shadow-md dark:bg-gray-800  bg-red-500">
        <div className="container flex justify-between items-center mx-auto">
          <div className="logo">
            <h1 className={`${audiowide.className} text-5xl `}>Fliio</h1>
          </div>
          <input
            className="border h-10 w-[30%] rounded-full"
            type="search"
            onChange={(e) => setIsValue(e.target.value)}
            onKeyUp={() => {
              console.log("kye: " + isValue);
            }}
          />
          <div className="icons flex items-center gap-2">
            <TbMoon key="theme-icon" size={24} onClick={toggleDarkMode} />
            <FaRegUser key="user-icon" size={20} />
            <RiShoppingCartLine key="cart-icon" size={22} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
