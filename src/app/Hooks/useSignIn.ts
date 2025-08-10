import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";

interface SignInResult {
  user: User | null;
  error: string | null;
}

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email sign in
  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<SignInResult> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Optional: check email verified
      if (!userCredential.user.emailVerified) {
        return {
          user: null,
          error: "Please verify your email before logging in.",
        };
      }
      return { user: userCredential.user, error: null };
    } catch (err: any) {
        console.log("erro", err.message);
      setError(err.message);
      return { user: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { signInWithEmail, loading, error };
}
