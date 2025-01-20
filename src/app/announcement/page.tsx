"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Megaphone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Announcement } from "./announcement.type";
import { announcements } from "./announcements";

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen mt-32 bg-[#F4EBEF] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
          Announcements
        </h1>

        {/* Removed Filter Section */}

        <AnimatePresence>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </AnimatePresence>
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
