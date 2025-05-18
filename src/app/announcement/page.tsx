"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Megaphone, Calendar, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Announcement } from "./announcement.type";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assume you have a Dialog component
import { realtimeDb } from "@/lib/firebase"; // your firebase config file
import { ref, push, set, onValue } from "firebase/database";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AnnouncementsPage() {
  const role = useUserRole();

  // Dialog open state
  const [dialogOpen, setDialogOpen] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Loading state (optional)
  const [loading, setLoading] = useState(true);

  // Error state (optional)
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<Omit<Announcement, "id">>({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  // Fetch announcements from Firebase on mount
  useEffect(() => {
    const announcementsRef = ref(realtimeDb, "announcements");

    const unsubscribe = onValue(
      announcementsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data && typeof data === "object") {
          // Object.values returns unknown[] so we need to assert to Announcement[]
          const list = Object.values(data) as Announcement[];

          // Optional: sort by date (descending)
          list.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          setAnnouncements(list);
        } else {
          setAnnouncements([]);
        }

        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch announcements:", err);
        setError("Failed to load announcements.");
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Simple input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save announcement to Firebase Realtime DB
  const handleSave = async () => {
    if (!form.title || !form.description || !form.date || !form.category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const announcementsRef = ref(realtimeDb, "announcements");
      const newAnnouncementRef = push(announcementsRef);
      const newAnnouncement = {
        id: newAnnouncementRef.key,
        ...form,
      };
      await set(newAnnouncementRef, newAnnouncement);

      setDialogOpen(false);
      setForm({ title: "", description: "", date: "", category: "" });

      // 🔴 Don't manually update setAnnouncements here
    } catch (error) {
      console.error("Failed to save announcement:", error);
      alert("Failed to save announcement");
    }
  };

  return (
    <div className="min-h-screen mt-32 bg-[#F4EBEF] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Announcements
          </h1>
          {role === "admin" && (
            <Button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Announcement
            </Button>
          )}
        </div>

        {loading && <p>Loading announcements...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <AnimatePresence>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </AnimatePresence>

        {/* Redesigned Add Announcement Dialog */}
        {dialogOpen && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-md w-full rounded-lg p-6">
              <DialogHeader>
                <DialogTitle>Add Announcement</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new announcement.
                </DialogDescription>
              </DialogHeader>

              <form
                className="grid gap-5 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-1 text-sm font-medium"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block mb-1 text-sm font-medium"
                  >
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium"
                  >
                    Category
                  </label>
                  <Input
                    id="category"
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <DialogFooter className="flex justify-end gap-3 mt-6">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-indigo-600" />
            {announcement.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">{announcement.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(announcement.date).toLocaleDateString()}</span>
          </div>
          <div className="text-sm font-medium text-indigo-600">
            {announcement.category}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Read More</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
