import axios from "axios";
import { useState } from "react";

export function useUpdateUserLevel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUserLevel = async (email: string, newLevel: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/update-user-level`,
        { email, level: newLevel }
      );
      setSuccess(true);
      return res.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred"
      );
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserLevel, loading, error, success };
}
