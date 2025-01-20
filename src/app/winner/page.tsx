"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardDescription } from "@/components/ui/card"; // Assuming you have a card component from ShadCN
import { motion } from "framer-motion";
import { tournaments } from "./tournaments";

const TournamentWinnerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tournaments based on search query
  const filteredTournaments = tournaments.filter(
    (tournament) =>
      tournament.tournamentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tournament.winners.some((winner) =>
        winner.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-12 p-6">
      {/* Header Section */}
      <motion.div
        className="mt-24 relative bg-cover bg-center h-[400px] text-center text-white flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/tzybanner.jpg)", // Replace with your banner image
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold">Tournament Winners</h1>
      </motion.div>

      {/* Search Input Section */}
      <div className="mb-8 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by player name or tournament"
          className="p-2 w-full md:w-1/2 mx-auto rounded-lg border border-gray-300"
        />
      </div>

      {/* Tournament Cards Section */}
      <div className="space-y-12 px-6 pb-6">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament, index) => (
            <div key={index} className="space-y-4">
              <motion.h2
                className="text-3xl font-bold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {tournament.tournamentName}
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tournament.winners.map((winner, winnerIndex) => (
                  <motion.div
                    key={winnerIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: winnerIndex * 0.2 }}
                  >
                    <Card className="shadow-lg bg-white p-4">
                      <CardHeader className="relative">
                        <img
                          src={winner.image}
                          alt={winner.name}
                          className="w-full h-56 object-cover rounded-lg"
                        />
                      </CardHeader>
                      <CardDescription>
                        <h3 className="text-xl font-semibold">{winner.name}</h3>
                        <p className="text-gray-600">{winner.category}</p>
                        <p className="text-lg mt-2 text-gray-700">
                          {winner.award}
                        </p>
                      </CardDescription>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No tournaments or winners found</p>
        )}
      </div>
    </div>
  );
};

export default TournamentWinnerPage;
