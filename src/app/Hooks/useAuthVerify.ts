import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "@/app/Redux_Store/store/store";

export const useAuthVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const user = useAppSelector((state) => state.auth.user);

  const verifyAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user && user.email && user.token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth-verification/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserData(response.data); // Save full user object
        return response.data; // Return full user object
      }
      return null;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred"
      );
      setUserData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { verifyAuth, loading, error, userData };
};
