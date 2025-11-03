import { supabase } from "../config";

export const getNavCategory = async () => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) {
    console.error("Supabase Error:", error);
  }
  return categories;
};
