"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/config";

type useDataError = string | null;
const memoryCache: Record<string, unknown[]> = {};
export function useDataSelect<T>(tableName: string) {
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
        const parsed = JSON.parse(cached);
        memoryCache[tableName] = parsed;
        setData(parsed);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .range(5, 5);
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
