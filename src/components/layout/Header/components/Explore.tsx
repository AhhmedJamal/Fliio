"use client";
import { useTranslations } from "next-intl";

const Explore = () => {
  const tKeys = [
    "our_story",
    "our_journal",
    "faqs",
    "contact_us",
    "contact_with_map",
    "store_locations",
    "build_your_bundle",
  ];

  const t = useTranslations("Header.Explore");
  return (
    <ul className="w-full">
      {tKeys.map((item) => {
        return (
          <li key={item} className="">
            {t(item)}
          </li>
        );
      })}
    </ul>
  );
};

export default Explore;
