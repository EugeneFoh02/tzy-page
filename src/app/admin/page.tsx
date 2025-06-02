"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, realtimeDb } from "@/lib/firebase";
import * as XLSX from "xlsx";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [shirtSizeFilter, setShirtSizeFilter] = useState("ALL");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data()?.role : null;

      if (role !== "admin") {
        router.push("/unauthorized");
        return;
      }

      const snapshot = await get(child(ref(realtimeDb), "registrations"));
      const rawData = snapshot.val() || {};

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

  function filterEntries(entries: any[], category: string) {
    const lowerTerm = searchTerm.toLowerCase();

    let filtered = entries.filter((entry) => {
      const matchesName =
        !searchTerm ||
        entry.player1Name?.toLowerCase().includes(lowerTerm) ||
        (category.includes("DOUBLE") && entry.player2Name?.toLowerCase().includes(lowerTerm));

      const matchesShirt =
        shirtSizeFilter === "ALL" ||
        entry.player1ShirtSize === shirtSizeFilter ||
        (category.includes("DOUBLE") && entry.player2ShirtSize === shirtSizeFilter);

      return matchesName && matchesShirt;
    });

    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return filtered;
  }

  function exportToExcel() {
    const workbook = XLSX.utils.book_new();
    const categoriesToExport = selectedCategory === "ALL" ? CATEGORIES : [selectedCategory];

    categoriesToExport.forEach((category) => {
      const entries = filterEntries(entriesByCategory[category] || [], category);
      if (entries.length === 0) return;

      const formatted = entries.map((entry) => {
        const row: any = {
          "Player 1 Name": entry.player1Name,
          "Player 1 IC": entry.player1IC,
          "Player 1 Shirt Size": entry.player1ShirtSize,
          Academy: entry.academy,
        };
        if (category.includes("DOUBLE")) {
          row["Player 2 Name"] = entry.player2Name || "-";
          row["Player 2 IC"] = entry.player2IC || "-";
          row["Player 2 Shirt Size"] = entry.player2ShirtSize || "-";
        }
        return row;
      });

      const sheet = XLSX.utils.json_to_sheet(formatted);

      const columnWidths = Object.keys(formatted[0]).map((key) => ({
        wch: Math.max(key.length, ...formatted.map((row) => row[key]?.toString().length ?? 0)) + 2,
      }));
      sheet["!cols"] = columnWidths;

      XLSX.utils.book_append_sheet(workbook, sheet, category.slice(0, 31));
    });

    XLSX.writeFile(workbook, "TZY_JUNIOR_CUP_2025_REGISTRATIONS.xlsx");
  }

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const categoriesToCount = selectedCategory === "ALL" ? CATEGORIES : [selectedCategory];
  const totalEntriesCount = categoriesToCount.reduce((acc, category) => {
    const entries = filterEntries(entriesByCategory[category] || [], category);
    return acc + entries.length;
  }, 0);

  const totalShirtSizeCount =
    shirtSizeFilter === "ALL"
      ? "N/A"
      : categoriesToCount.reduce((acc, category) => {
          const entries = filterEntries(entriesByCategory[category] || [], category);
          const count = entries.reduce((count, entry) => {
            let player1Match = entry.player1ShirtSize === shirtSizeFilter ? 1 : 0;
            let player2Match =
              category.includes("DOUBLE") && entry.player2ShirtSize === shirtSizeFilter ? 1 : 0;
            return count + player1Match + player2Match;
          }, 0);
          return acc + count;
        }, 0);

  return (
    <div className="p-6 min-h-screen mt-32">
      <h1 className="text-2xl font-bold mb-6">Admin – Player Registrations</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Filter by player name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full sm:max-w-md"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={shirtSizeFilter}
            onChange={(e) => setShirtSizeFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="ALL">All Shirt Sizes</option>
            {["3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "5XL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-base text-nowrap"
          >
            Export to Excel
          </button>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-sm sm:text-base">
          <span className="text-gray-700 whitespace-nowrap">
            Total Entries: <strong>{totalEntriesCount}</strong>
          </span>
          {shirtSizeFilter !== "ALL" && (
            <span className="text-gray-700 whitespace-nowrap">
              Total with shirt size <strong>{shirtSizeFilter}</strong>:{" "}
              <strong>{totalShirtSizeCount}</strong>
            </span>
          )}
        </div>
      </div>

      {(selectedCategory === "ALL" ? CATEGORIES : [selectedCategory]).map((category) => {
        const filteredEntries = filterEntries(entriesByCategory[category] || [], category);

        return (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-3">{category}</h2>

            {filteredEntries.length > 0 ? (
              <table className="w-full table-auto border">
                <thead>
                  <tr className="bg-gray-200 cursor-pointer text-center">
                    {[
                      { label: "Player 1 Name", key: "player1Name" },
                      { label: "IC", key: "player1IC" },
                      { label: "Shirt Size", key: "player1ShirtSize" },
                      { label: "Academy", key: "academy" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="border p-2 hover:bg-gray-300"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}{" "}
                        {sortConfig?.key === col.key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                      </th>
                    ))}

                    {category.includes("DOUBLE") &&
                      [
                        { label: "Player 2 Name", key: "player2Name" },
                        { label: "IC", key: "player2IC" },
                        { label: "Shirt Size", key: "player2ShirtSize" },
                      ].map((col) => (
                        <th
                          key={col.key}
                          className="border p-2 hover:bg-gray-300"
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}{" "}
                          {sortConfig?.key === col.key
                            ? sortConfig.direction === "asc"
                              ? "▲"
                              : "▼"
                            : ""}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, idx) => (
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
        );
      })}
    </div>
  );
}
