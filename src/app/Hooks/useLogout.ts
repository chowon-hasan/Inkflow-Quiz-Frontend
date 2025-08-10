"use client"
import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/app/Redux_Store/store/authSlice";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      dispatch(logout());
      // eslint-disable-next-line
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { logoutUser, loading, error };
}
