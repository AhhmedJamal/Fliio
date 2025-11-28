"use client";
import { supabase } from "@/lib/config";
import React, { useEffect } from "react";

const ProductList = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .gte("price", 1000) // greater than or equal 50
        .lte("price", 5000); // less than or equal 150

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        console.log("Fetched products:", data);
      }
    };

    fetchProducts();
  }, []);
  return <div>ProductList</div>;
};

export default ProductList;
