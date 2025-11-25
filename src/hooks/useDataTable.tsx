"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/config";

type useDataError = string | null;
const memoryCache: Record<string, unknown[]> = {};
export function useDataTable<T>(tableName: string) {
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

      const cached = localStorage.getItem(`table-${tableName}`);

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
          localStorage.removeItem(`table-${tableName}`);
        }
      }
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase.from(tableName).select("*");

        if (error) throw error;
        if (data) {
          memoryCache[tableName] = data;
          localStorage.setItem(`table-${tableName}`, JSON.stringify(data));
          setData(data as T[]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);
  const refresh = async () => {
    memoryCache[tableName] = [];
    localStorage.removeItem(`table-${tableName}`);
    setData([]);
    setLoading(true);
  };
  return { data, loading, error, refresh };
}
