"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDataTable } from "@/hooks/useDataTable";
import { useLocale } from "next-intl";
import ProductsCategory from "@/components/layout/Header/components/ProductCategory";
import Info from "@/components/layout/Header/components/Info";
import BestSeller from "@/components/layout/Header/components/BestSeller";
import Explore from "@/components/layout/Header/components/Explore";
import Category from "@/components/layout/Header/components/Category";
import Shimmer from "@/components/ui/Shemmier";

interface NavLink {
  id?: number;
  label: Record<string, number>;
  type: string;
}

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const locale = useLocale();
  const { data, loading } = useDataTable<NavLink>("nav_link");
  const components: Record<string, React.ComponentType> = {
    products_category: ProductsCategory,
    categories: Category,
    pages: Explore,
    info: Info,
    products: BestSeller,
  };

  useEffect(() => {
    queueMicrotask(() => {
      if (Array.isArray(data)) setNavLinks(data as NavLink[]);
    });
  }, [data]);

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  return (
    <nav className="container mx-auto py-4 w-fit ">
      <ul className="flex gap-x-4 gap-y-1 justify-between flex-wrap">
        {!loading ? (
          navLinks.map((link) => {
            const Component = components[link.type as keyof typeof components];
            return (
              <li
                key={link.id ?? link.label[locale]}
                role="menuitem"
                className={`group  ${
                  link.type === "pages" || link.type === "info"
                    ? "relative"
                    : ""
                }`}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center  gap-1 text-sm cursor-pointer">
                  {link.label[locale]}
                  <IoIosArrowDown className="transition-transform duration-300 group-hover:-rotate-90" />
                </div>

                {/* dropdown */}
                <div className="absolute left-0 top-full p-4 w-fit h-[300px] bg-white text-black shadow-md rounded overflow-hidden -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                  {Component ? (
                    <Component />
                  ) : (
                    <div className="p-4 text-gray-500 text-sm">
                      No component
                    </div>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <Shimmer />
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
