"use client";
import HomeLayout from "@/app/Components/Homepage/HomeLayout";
import Login_Signup from "@/app/Components/Login_SignUp/Login_Signup";
import ProviderWrapper from "@/app/ProviderWrapper";
import { useAppSelector } from "@/app/Redux_Store/store/store";
import { useAuthVerify } from "@/app/Hooks/useAuthVerify";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  const { verifyAuth, loading: verifyLoading } = useAuthVerify();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerification = async () => {
      if (user && user.email) {
        const verified = await verifyAuth();
        setIsVerified(verified);
      } else {
        setIsVerified(false);
      }
      setLoading(false);
    };
    checkVerification();
    // eslint-disable-next-line
  }, [user]);

  return (
    <ProviderWrapper>
      {loading || verifyLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Checking verification...</p>
        </div>
      ) : !user || !isVerified ? (
        <Login_Signup />
      ) : (
        <HomeLayout />
      )}
    </ProviderWrapper>
  );
}
