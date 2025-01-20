"use client";
import { motion } from "framer-motion";
import AboutSection from "./Home/AboutSection";
import AchievementsSections from "./Home/AchievementsSection";
import EmailSection from "./Home/EmailSection";
import Footer from "./Home/Footer";
import HeroSection from "./Home/HeroSection";
import NavBar from "./Home/NavBar";
import ProjectSection from "./Home/ProjectSection";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#F4EBEF]">
      <NavBar />
      <div className="container mt-24 mx-auto px-12 py-8">
        {/* Hero Section with scroll animation */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        {/* Achievements Section with scroll animation */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <AchievementsSections />
        </motion.div>

        {/* About Section with scroll animation */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <AboutSection />
        </motion.div>

        {/* Project Section with scroll animation */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <ProjectSection />
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
