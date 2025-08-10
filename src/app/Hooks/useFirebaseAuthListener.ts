import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { setUser } from "@/app/Redux_Store/store/authSlice";
import { useAppDispatch } from "@/app/Redux_Store/store/store";
import { useEffect } from "react";

export function useFirebaseAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              email: user.email ?? "",
              uid: user.uid,
              token,
              emailVerified: user.emailVerified,
            })
          );
        });
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
}
