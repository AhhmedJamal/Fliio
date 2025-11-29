"use client";
import { supabase } from "@/lib/config";
import { useEffect, useState } from "react";

type UseDataError = string | null;

interface UseFiltersOptions {
  tableName?: string;
  columnName: string;
  minMax?: {
    min?: number;
    max?: number;
  };
}

export function useFilters<T>({
  tableName = "products",
  columnName,
  minMax,
}: UseFiltersOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<UseDataError>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let query = supabase.from(tableName).select("*");
        if (minMax?.min !== undefined) {
          query = query.gte(columnName, minMax.min);
        }
        if (minMax?.max !== undefined) {
          query = query.lte(columnName, minMax.max);
        }
        const { data: result, error: fetchError } = await query;
  
        if (fetchError) {
          throw fetchError;
        }

        setData((result as T[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, columnName, minMax?.min, minMax?.max]);

  return { data, loading, error };
}

export default useFilters;
