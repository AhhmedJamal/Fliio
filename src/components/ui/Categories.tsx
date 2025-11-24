"use client";
import { useDataSelect } from "@/hooks/useDataSelect";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useSelector } from "react-redux";

interface CategoriesProps {
  id: string;
  name: {
    en: string;
    fr: string;
    es: string;
  };
  image: string;
}
const Categories = () => {
  const { data } = useDataSelect<CategoriesProps>("categories");
  const locale = useSelector((state: RootState) => state.locale.value);
  console.log(data);   

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((category) => (
          <div key={category.id} className="border p-4 rounded-lg text-center">
            <Image
              src={category.image}
              alt={category.name[locale as keyof typeof category.name]}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-medium">
              {category.name[locale as keyof typeof category.name]}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
