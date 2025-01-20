"use client";

import { useState } from "react";
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
import { CalendarIcon, MapPinIcon } from "lucide-react";

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

const sampleTournaments: MonthlyTournaments = {
  January: [
    {
      id: "1",
      name: "3rd TZY Intra Tournament",
      Date: "9 FEB 2025",
      location: "ACS, Ipoh",
      category: "TZY Member",
    },
    {
      id: "2",
      name: "Example 1",
      Date: "Jan 17 - Jan 22",
      location: "ACS, Ipoh",
      category: "Bakat Baru",
    },
    {
      id: "3",
      name: "Example 2",
      Date: "Mar 7",
      location: "ACS, Ipoh",
      category: "Junior Cup",
    },
  ],
  March: [
    {
      id: "4",
      name: "Example 3",
      Date: "Mar 14",
      location: "ACS, Ipoh",
      category: "Novice",
    },
  ],
  April: [
    {
      id: "5",
      name: "Example 4",
      Date: "Apr 11",
      location: "ACS, Ipoh",
      category: "Semi Pro",
    },
  ],
};

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
        {/* Timeline dot */}
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
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  const filteredTournaments = Object.entries(sampleTournaments).reduce(
    (acc, [month, tournaments]) => {
      const filteredMonthTournaments = tournaments.filter(
        (tournament) =>
          selectedCategory === "All Categories" ||
          tournament.category === selectedCategory
      );
      if (filteredMonthTournaments.length > 0) {
        acc[month] = filteredMonthTournaments;
      }
      return acc;
    },
    {} as MonthlyTournaments
  );

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
            backgroundPosition: "",
            color: "white", // Ensure text is readable
            padding: "48px", // Adjust padding as needed
            
          }}
        >
          TZY Tournament Schedule
        </motion.h1>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-full sm:w-[300px]">
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

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line */}
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
            {Object.entries(filteredTournaments).map(([month, tournaments]) => (
              <motion.div
                key={month}
                className="relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {/* Month label */}
                <div className="flex justify-center mb-8">
                  <motion.h2
                    className="text-2xl font-semibold bg-[#F4EBEF] px-4 relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {month}
                  </motion.h2>
                </div>

                {/* Tournament cards */}
                <div className="-space-y-8">
                  {tournaments.map((tournament, index) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                      isLeft={index % 2 === 0}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
