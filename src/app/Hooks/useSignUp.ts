import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import {
  createUserWithEmailAndPassword,
  User,
  sendEmailVerification,
} from "firebase/auth";

interface SignupResult {
  user: User | null;
  error: string | null;
}


export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email signup
  const signupWithEmail = async (
    email: string,
    password: string
  ): Promise<SignupResult> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent to:", email);
      return { user: userCredential.user, error: null };
      // eslint-disable-next-line
    } catch (err: any) {
      setError(err.code || err.message);
      return { user: null, error: err.code || err.message };
    } finally {
      setLoading(false);
    }
  };


  return { signupWithEmail, loading, error };
}
