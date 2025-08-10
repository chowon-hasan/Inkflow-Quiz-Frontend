
import axios from "axios";
import { useState } from "react";

interface UserData {
  email: string;
  uid: string;
  role: string; 
  level: string;
  isValidated: boolean; 
}

export const useSaveUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUser = async (user: UserData, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/save-user`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { saveUser, loading, error };
};
