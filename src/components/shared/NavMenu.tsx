"use client";
import { getNavCategory } from "@/lib/supabase/api/navCategory";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface NavLink {
  id?: number;
  label: string;
  subcategories?: NavLink[];
}
const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNavCategory();
        if (Array.isArray(data)) setNavLinks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  return (
    <nav className="container mx-auto py-4 w-fit">
      <ul className="flex gap-x-4 gap-y-1 justify-between flex-wrap">
        {navLinks.map((link) => (
          <li
            key={link.id ?? link.label}
            role="menuitem"
            aria-haspopup={!!link.subcategories}
            className="group link-menu"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center relative gap-1  text-sm  hover:cursor-pointer duration-200  before:content-[''] before:absolute before:bottom-0 before:-left-0.5 before:w-0 before:h-0.5 before:bg-neutral-400 transition-all hover:text-neutral-300 hover:before:w-full before:transition-all before:duration-300">
              {link.label}
              <IoIosArrowDown className="group-hover:-rotate-90 transition-all duration-300" />
            </div>
            {/* subcategories */}
            {link.subcategories && (
              <div className="w-full bg-white absolute z-10 left-0 top-full text-black opacity-0 h-0 group-hover:opacity-100 group-hover:h-full transition-all duration-200 delay-300 ease-in p-3 overflow-hidden">
                {link.subcategories.map((subLink, i) => (
                  <div key={i}>{subLink.label}</div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
