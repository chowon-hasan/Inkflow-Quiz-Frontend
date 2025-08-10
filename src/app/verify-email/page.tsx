"use client";
import { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import { useSaveUser } from "@/app/Hooks/useSaveUser";

const VerifyEmailPage = () => {
  // eslint-disable-next-line
  const [message, setMessage] = useState("Verifying...");
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const router = useRouter();
  const { saveUser } = useSaveUser();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setMessage("Invalid verification link.");
        return;
      }
      try {
        await applyActionCode(auth, oobCode);
        setMessage("Email verified successfully! You can now log in.");

        // Get user from Firebase Auth
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          // Save user to backend
          await saveUser(
            {
              email: user.email ?? "",
              uid: user.uid,
              role: "student",
              level: "Alpha 1",
              isValidated: true,
            },
            token
          );
        }
        console.log("Email verified successfully");

        setTimeout(() => {
          router.push("/");
        }, 2000);
        // eslint-disable-next-line
      } catch (error: any) {
        setMessage("Verification failed: " + error.message);
      }
    };
    verifyEmail();
  }, [router, oobCode, saveUser]);

  return (
    <div>
      <h2>Email Verification</h2>
    </div>
  );
};

export default VerifyEmailPage;
