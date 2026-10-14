import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get<T>(url);
        if (active) setData(response.data);
      } catch (fetchError) {
        console.error(fetchError);
        if (active) setError("We couldn't load the bakery menu. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [url]);

  return { data, loading, error };
}
