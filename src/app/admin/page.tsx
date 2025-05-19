"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, realtimeDb } from "@/lib/firebase";

const CATEGORIES = [
  "SINGLE UNDER 10",
  "SINGLE UNDER 12",
  "SINGLE UNDER 14",
  "SINGLE UNDER 16",
  "SINGLE UNDER 18",
  "DOUBLE UNDER 16",
  "DOUBLE UNDER 22",
];

export default function AdminEntriesPage() {
  const router = useRouter();
  const [entriesByCategory, setEntriesByCategory] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      // 🔐 Check admin role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data()?.role : null;

      if (role !== "admin") {
        router.push("/unauthorized");
        return;
      }

      // 🔄 Fetch registrations from Realtime Database
      const snapshot = await get(child(ref(realtimeDb), "registrations"));
      const rawData = snapshot.val() || {};

      // 📊 Group entries by category
      const grouped: Record<string, any[]> = {};
      CATEGORIES.forEach((cat) => (grouped[cat] = []));
      Object.values(rawData).forEach((entry: any) => {
        if (entry.category && grouped[entry.category]) {
          grouped[entry.category].push(entry);
        }
      });

      setEntriesByCategory(grouped);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 min-h-screen mt-32">
      <h1 className="text-2xl font-bold mb-6">Admin – Player Registrations</h1>

      {CATEGORIES.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-3">{category}</h2>

          {entriesByCategory[category]?.length > 0 ? (
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Player 1 Name</th>
                  <th className="border p-2">IC</th>
                  <th className="border p-2">Shirt Size</th>
                  <th className="border p-2">Academy</th>
                  {category.includes("DOUBLE") && (
                    <>
                      <th className="border p-2">Player 2 Name</th>
                      <th className="border p-2">IC</th>
                      <th className="border p-2">Shirt Size</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {entriesByCategory[category].map((entry, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="border p-2">{entry.player1Name}</td>
                    <td className="border p-2">{entry.player1IC}</td>
                    <td className="border p-2">{entry.player1ShirtSize}</td>
                    <td className="border p-2">{entry.academy}</td>
                    {category.includes("DOUBLE") && (
                      <>
                        <td className="border p-2">{entry.player2Name || "-"}</td>
                        <td className="border p-2">{entry.player2IC || "-"}</td>
                        <td className="border p-2">{entry.player2ShirtSize || "-"}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No entries for this category.</p>
          )}
        </div>
      ))}
    </div>
  );
}
