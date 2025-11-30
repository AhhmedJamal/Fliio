"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/config";

type useDataError = string | null;
const memoryCache: Record<string, unknown[]> = {};
export function useDataSelect<T>(
  tableName: string,
  nameColumn: string,
  skuArray: string[]
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<useDataError>(null);
  useEffect(() => {
    if (!tableName) return;

    const fetchData = async () => {
      if (memoryCache[tableName]) {
        setData(memoryCache[tableName] as T[]);
        setLoading(false);
        return;
      }

      const cached = localStorage.getItem(`table-${tableName}-select`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryCache[tableName] = parsed;
            setData(parsed);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error parsing cached data:", e);
          if (typeof window !== "undefined") {
            localStorage.removeItem(`table-${tableName}-select`);
          }
        }
      }
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .in(nameColumn, skuArray);

        if (error) throw error;
        if (data) {
          const sortedData = skuArray
            .map((sku) => data.find((product) => product.sku === sku))
            .filter(Boolean) as T[];
          memoryCache[tableName] = sortedData;
          localStorage.setItem(
            `table-${tableName}-select`,
            JSON.stringify(sortedData)
          );
          setData(sortedData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nameColumn, skuArray, tableName]);

  const refresh = async () => {
    memoryCache[tableName] = [];
    localStorage.removeItem(`table-${tableName}`);
    setData([]);
    setLoading(true);
  };
  return { data, loading, error, refresh };
}
