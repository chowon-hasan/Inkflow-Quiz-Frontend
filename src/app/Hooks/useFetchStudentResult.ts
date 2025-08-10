import { useState } from "react";
import axios from "axios";

export function useFetchStudentResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line
  const [result, setResult] = useState<any>(null);

  const fetchResult = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student-result/${email}`
      );
      setResult(res.data);
      return res.data;
      // eslint-disable-next-line
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred"
      );
      setResult(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchResult, loading, error, result };
}
