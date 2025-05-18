// hooks/useUserRole.ts
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase"; // Your initialized Firebase app

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role === "admin" ? "admin" : "user");
          } else {
            console.warn("No user document found in Firestore");
            setRole("user"); // Default fallback role
          }
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          setRole("user"); // Safe fallback
        }
      } else {
        setRole(null); // Not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  return role;
}
