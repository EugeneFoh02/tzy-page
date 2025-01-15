import AboutSection from "./Home/AboutSection";
import AchievementsSections from "./Home/AchievementsSection";
import EmailSection from "./Home/EmailSection";
import Footer from "./Home/Footer";
import HeroSection from "./Home/HeroSection";
import NavBar from "./Home/NavBar";
import ProjectSection from "./Home/ProjectSection";

export default function Home() {
  return (
    <main className="flex flex-col bg-black">
      <NavBar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AchievementsSections />
        <AboutSection />
        <ProjectSection />
        <EmailSection />
      </div>
      <Footer/>
    </main>
  );
}
