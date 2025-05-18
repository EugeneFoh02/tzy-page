"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, Plus } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole"; // role hook
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { realtimeDb } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";

interface Tournament {
  id: string;
  name: string;
  Date: string;
  location: string;
  category: string;
}

interface MonthlyTournaments {
  [key: string]: Tournament[];
}

const categories = [
  "All Categories",
  "TZY Member",
  "Bakat Baru",
  "Novice",
  "Semi Pro",
  "Junior Cup",
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const timelineDotVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { delay: 0.2, duration: 0.3 } },
};

function TournamentCard({
  tournament,
  isLeft,
}: {
  tournament: Tournament;
  isLeft: boolean;
}) {
  return (
    <motion.div
      className={`flex ${
        isLeft ? "justify-start mr-[49.4%]" : "justify-end ml-[49.5%]"
      } relative`}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className={`w-full ${isLeft ? "pr-8" : "pl-8"}`}>
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-[#C4B3B7]">
            <CardTitle className="text-lg">{tournament.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2 text-black">
              <CalendarIcon className="h-4 w-4" />
              <span>{tournament.Date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2 text-black">
              <MapPinIcon className="h-4 w-4" />
              <span>{tournament.location}</span>
            </div>
            <Badge variant="secondary" className="mt-2">
              {tournament.category}
            </Badge>
          </CardContent>
        </Card>
        <motion.div
          className={`absolute ${
            isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          } top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background`}
          variants={timelineDotVariants}
        />
      </div>
    </motion.div>
  );
}

export default function AnimatedTournamentListing() {
  const role = useUserRole(); // user role hook

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [newTournament, setNewTournament] = useState<Omit<Tournament, "id">>({
    name: "",
    Date: "",
    location: "",
    category: "",
  });

  const [firebaseTournaments, setFirebaseTournaments] = useState<Tournament[]>(
    []
  );

  // Listen to realtime DB tournaments data
  useEffect(() => {
    const tournamentsRef = ref(realtimeDb, "tournaments");
    const unsubscribe = onValue(tournamentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]) => ({
          id,
          ...(val as Omit<Tournament, "id">),
        }));
        setFirebaseTournaments(list);
      } else {
        setFirebaseTournaments([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Group tournaments by month extracted from Date string
  const groupedTournaments = firebaseTournaments.reduce((acc, tournament) => {
    // Extract month string from Date (simple heuristic)
    // Assuming Date string starts with month like "Jan", "Feb", etc.
    const monthMatch = tournament.Date.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i
    );
    const month = monthMatch ? monthMatch[0] : "Other";

    // Filter by selected category
    if (
      selectedCategory === "All Categories" ||
      tournament.category === selectedCategory
    ) {
      if (!acc[month]) acc[month] = [];
      acc[month].push(tournament);
    }

    return acc;
  }, {} as MonthlyTournaments);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTournament((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTournament = async () => {
    if (
      !newTournament.name ||
      !newTournament.Date ||
      !newTournament.location ||
      !newTournament.category
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await push(ref(realtimeDb, "tournaments"), newTournament);
      setDialogOpen(false);
      setNewTournament({ name: "", Date: "", location: "", category: "" });
    } catch (error) {
      console.error("Error saving tournament:", error);
      alert("Failed to save tournament. Please try again.");
    }
  };

  return (
    <div className="pt-32 bg-[#F4EBEF] min-h-[calc(100vh-64px)]">
      <main className="container mx-auto p-4">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: "url(/images/tzybanner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "48px",
          }}
        >
          TZY Tournament Schedule
        </motion.h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <motion.div
            className="w-full sm:w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {role === "admin" && (
            <Button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2"
              variant="default"
            >
              <Plus className="w-4 h-4" />
              Add Tournament
            </Button>
          )}
        </div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <motion.div
            className="space-y-16"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {Object.entries(groupedTournaments).map(([month, tournaments]) => (
              <div key={month}>
                <h2 className="text-3xl font-bold text-center mb-8">{month}</h2>
                <div>
                  {tournaments.map((tournament, index) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                      isLeft={index % 2 === 0}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* If no tournaments in filtered category */}
            {Object.keys(groupedTournaments).length === 0 && (
              <p className="text-center text-muted-foreground mt-12">
                No tournaments found for selected category.
              </p>
            )}
          </motion.div>
        </div>

        {/* Redesigned Add Tournament Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md w-full rounded-lg bg-white p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900 mb-1">
                Add Tournament
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mb-6">
                Please fill in the tournament details below.
              </DialogDescription>
            </DialogHeader>

            <form
              className="grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTournament();
              }}
            >
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Tournament Name
              </label>
              <input
                id="name"
                className="input-field rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Enter tournament name"
                value={newTournament.name}
                onChange={handleInputChange}
                required
              />

              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                id="date"
                className="input-field rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="Date"
                placeholder="e.g., Apr 2025"
                value={newTournament.Date}
                onChange={handleInputChange}
                required
              />

              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                className="input-field rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="location"
                placeholder="Enter location"
                value={newTournament.location}
                onChange={handleInputChange}
                required
              />

              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newTournament.category}
                onChange={handleInputChange}
                className="input-field rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories
                  .filter((cat) => cat !== "All Categories")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              <DialogFooter className="mt-6 flex justify-end space-x-3">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
