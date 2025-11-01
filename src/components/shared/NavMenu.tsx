"use client";
import { supabase } from "@/lib/supabase/config";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface NavLink {
  label: string;
  subcategories?: NavLink[];
}
const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dataTask = {
    id:111,
    created_at:" p",
    labale: "old",
    subCategory: [
      {
        labale: "subOld",
        newOld: {
          img: "https//",
          name: "dog",
        },
      },
    ],
  };
  const addData = async () => {
    const { data, error } = supabase
      .from("categories")
      .insert([dataTask])
      .single();
  };
  useEffect(() => {
    const getData = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.error("Supabase Error:", error);
        return;
      }

      if (categories) {
        console.log("Categories:", categories);
      }
    };

    getData();
    addData();
    // تغيير خلفية الـ body لو القائمة مفتوحة
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    // تنظيف الكلاس لما يتقفل الكومبوننت (اختياري)
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  const navLinks: NavLink[] = [
    {
      label: "Shop by Category",
      subcategories: [
        {
          label: "Home Appliances",
          subcategories: [
            {
              label: "Air & Comfort",
              subcategories: [
                { label: "Air Conditioners" },
                { label: "Heaters" },
                { label: "Fans" },
                { label: "Humidifiers" },
              ],
            },
            {
              label: "Kitchen",
              subcategories: [
                { label: "Refrigerators" },
                { label: "Ovens" },
                { label: "Microwaves" },
                { label: "Blenders" },
              ],
            },
            {
              label: "Cleaning",
              subcategories: [
                { label: "Vacuums" },
                { label: "Washers" },
                { label: "Dryers" },
              ],
            },
          ],
        },
        {
          label: "Audio & Games",
          subcategories: [
            {
              label: "Headphones",
              subcategories: [
                { label: "Wireless" },
                { label: "Wired" },
                { label: "Gaming Headsets" },
              ],
            },
            {
              label: "Speakers",
              subcategories: [
                { label: "Bluetooth" },
                { label: "Smart" },
                { label: "Portable" },
              ],
            },
            {
              label: "Gaming",
              subcategories: [
                { label: "Consoles" },
                { label: "Controllers" },
                { label: "VR" },
              ],
            },
          ],
        },
        {
          label: "Computers",
          subcategories: [
            {
              label: "Laptops",
              subcategories: [
                { label: "Gaming" },
                { label: "Business" },
                { label: "Ultrabooks" },
              ],
            },
            {
              label: "Desktops",
              subcategories: [
                { label: "All in One" },
                { label: "Towers" },
                { label: "Workstations" },
              ],
            },
            {
              label: "Accessories",
              subcategories: [
                { label: "Keyboards" },
                { label: "Mice" },
                { label: "Monitors" },
              ],
            },
          ],
        },
        {
          label: "Mobile Devices",
          subcategories: [
            {
              label: "Smartphones",
              subcategories: [
                { label: "Android" },
                { label: "iOS" },
                { label: "Budget" },
              ],
            },
            {
              label: "Tablets",
              subcategories: [
                { label: "iPad" },
                { label: "Android Tablets" },
                { label: "Windows" },
              ],
            },
            {
              label: "Wearables",
              subcategories: [
                { label: "Smartwatches" },
                { label: "Fitness Bands" },
                { label: "Earbuds" },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "New Arrivals",
      subcategories: [
        {
          label: "Electronics",
          subcategories: [
            { label: "Smartphones" },
            { label: "Laptops" },
            { label: "Tablets" },
          ],
        },
        {
          label: "Home Appliances",
          subcategories: [
            { label: "Kitchen" },
            { label: "Cleaning" },
            { label: "Comfort" },
          ],
        },
        {
          label: "Accessories",
          subcategories: [
            { label: "Phone" },
            { label: "Computer" },
            { label: "Gaming" },
          ],
        },
      ],
    },
    {
      label: "Best Sellers",
      subcategories: [
        {
          label: "Top Rated",
          subcategories: [
            { label: "Electronics" },
            { label: "Appliances" },
            { label: "Accessories" },
          ],
        },
        {
          label: "Most Popular",
          subcategories: [
            { label: "Smartphones" },
            { label: "Headphones" },
            { label: "Smart Home" },
          ],
        },
        {
          label: "Recommended",
          subcategories: [
            { label: "For You" },
            { label: "Trending" },
            { label: "New Deals" },
          ],
        },
      ],
    },
    {
      label: "Home Appliances",
      subcategories: [
        {
          label: "Air & Comfort",
          subcategories: [
            { label: "Air Conditioners" },
            { label: "Heaters" },
            { label: "Fans" },
            { label: "Purifiers" },
          ],
        },
        {
          label: "Camera",
          subcategories: [
            { label: "Indoor" },
            { label: "Outdoor" },
            { label: "Doorbell" },
            { label: "Systems" },
          ],
        },
        {
          label: "Lighting",
          subcategories: [
            { label: "Smart Bulbs" },
            { label: "LED Strips" },
            { label: "Lamps" },
            { label: "Outdoor" },
          ],
        },
        {
          label: "Smart Home Devices",
          subcategories: [
            { label: "Hubs" },
            { label: "Sensors" },
            { label: "Locks" },
            { label: "Thermostats" },
          ],
        },
      ],
    },
    {
      label: "Audio & Games",
      subcategories: [
        {
          label: "Home Theater",
          subcategories: [
            { label: "Soundbars" },
            { label: "Receivers" },
            { label: "Projectors" },
            { label: "Speakers" },
          ],
        },
        {
          label: "Gaming",
          subcategories: [
            { label: "Consoles" },
            { label: "Accessories" },
            { label: "VR" },
            { label: "Chairs" },
          ],
        },
        {
          label: "Audio",
          subcategories: [
            { label: "Headphones" },
            { label: "Earbuds" },
            { label: "Speakers" },
            { label: "Turntables" },
          ],
        },
      ],
    },
    {
      label: "Pages",
      subcategories: [
        {
          label: "Company",
          subcategories: [
            { label: "About Us" },
            { label: "Careers" },
            { label: "Press" },
          ],
        },
        {
          label: "Support",
          subcategories: [
            { label: "Contact Us" },
            { label: "FAQ" },
            { label: "Shipping" },
            { label: "Returns" },
          ],
        },
        {
          label: "Legal",
          subcategories: [
            { label: "Privacy" },
            { label: "Terms" },
            { label: "Cookies" },
          ],
        },
      ],
    },
  ];

  return (
    <nav
      className="container mx-auto py-4 "
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <ul className="flex gap-x-4 gap-y-1 justify-between flex-wrap">
        {navLinks.map((link) => (
          <div key={link.label} className="group link-menu">
            <li className="flex items-center relative gap-1  text-sm  hover:cursor-pointer duration-200  before:content-[''] before:absolute before:-bottom-px before:left-0 before:w-0 before:h-0.5 before:bg-neutral-400 transition-all hover:text-neutral-300 hover:before:w-full before:transition-all before:duration-300">
              {link.label}
              <IoIosArrowDown className="group-hover:-rotate-90 transition-all duration-300" />
            </li>
            {/* subcategories */}
            {link.subcategories && (
              <div className="w-full bg-white absolute z-10 left-0 top-full text-black opacity-0 h-0 group-hover:opacity-100 group-hover:h-full transition-all duration-200 delay-300 ease-in p-3 overflow-hidden">
                {link.subcategories.map((subLink) => (
                  <div key={subLink.label}>{subLink.label}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
