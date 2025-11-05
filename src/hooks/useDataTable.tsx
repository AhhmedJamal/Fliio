import { useState, useEffect } from "react";
import { supabase } from "@/lib/config";

type useDataError = string | null;

export function useDataTable<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<useDataError>(null);

  useEffect(() => {
    if (!tableName) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase.from(tableName).select("*");
        if (error) throw error;
        if (data) setData(data as T[]);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}
