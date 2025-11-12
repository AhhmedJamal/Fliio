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
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  id?: number;
  label: Record<string, number>;
  type: string;
}

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const locale = useLocale();
  const { data, loading, error } = useDataTable<NavLink>("nav_link");
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
    <nav className="container mx-auto py-4 w-fit">
      <ul className="flex gap-x-4 gap-y-1 justify-between flex-wrap relative">
        {navLinks.map((link) => {
          const Component = components[link.type as keyof typeof components];
          return (
            <li
              key={link.id ?? link.label[locale]}
              role="menuitem"
              className="group link-menu"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center relative gap-1 text-sm hover:cursor-pointer duration-200 before:content-[''] before:absolute before:bottom-0 before:-left-0.5 before:w-0 before:h-0.5 before:bg-neutral-400 transition-all hover:text-neutral-300 hover:before:w-full before:transition-all before:duration-300">
                {link.label[locale] ? link.label[locale] : "loading"}
                <IoIosArrowDown className="group-hover:-rotate-90 transition-all duration-300" />
              </div>

              {/* dropdown */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'fit-content', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="
        absolute left-0 top-full w-full bg-white text-black p-4 shadow-lg rounded
        z-10
      "
                  >
                    {Component ? (
                      <Component />
                    ) : (
                      <div className="py-1 text-gray-500 text-sm">
                        No component found for {link.type}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
