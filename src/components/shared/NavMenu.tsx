"use client";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDataTable } from "@/hooks/useDataTable";
import ProductsCategory from "@/components/layout/Header/components/ProductCategory";
import Info from "@/components/layout/Header/components/Info";
import BestSeller from "@/components/layout/Header/components/BestSeller";
import Explore from "@/components/layout/Header/components/Explore";
import Category from "@/components/layout/Header/components/Category";
import Shimmer from "@/components/ui/Shemmier";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NavLink {
  id?: number;
  label: Record<string, number>;
  type: string;
}

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const locale = useSelector((state: RootState) => state.locale.value);
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
    <nav className="container mx-auto py-4 w-fit hidden md:block">
      <ul className="flex gap-x-4 gap-y-1 justify-between flex-wrap ">
        {!loading ? (
          navLinks.map((link) => {
            const Component = components[link.type as keyof typeof components];
            return (
              <li
                key={link.id ?? link.label[locale]}
                role="menuitem"
                className={`group ${
                  link.type === "pages" || link.type === "info" ? "" : ""
                }`}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center  gap-1 text-sm cursor-pointer">
                  {link.label[locale]}
                  <IoIosArrowDown className="transition-transform duration-300 group-hover:-rotate-90" />
                </div>

                {/* dropdown */}
                <div className="absolute z-10 left-0 top-[150px] p-4 w-full h-fit bg-white text-black shadow-md rounded overflow-hidden opacity-0 translate-y-4 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out pointer-events-non">
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
          <Shimmer
            count={5}
            className="h-5 w-20 rounded "
            backGroundColor="bg-neutral-600"
          />
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
