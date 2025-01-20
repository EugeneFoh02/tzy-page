"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { useState } from "react";

const projectsData = [
  {
    id: 1,
    title: "1st Invitation Cup",
    description: "TZY First Initiation Cup",
    image: "/images/Tournaments/1stInvitationCup.jpg",
    tag: ["All", "Tournaments"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "3rd Intra Tournament",
    description: "TZY third Intra Tournament",
    image: "/images/Tournaments/3rdIntraTournament.jpg",
    tag: ["All", "Tournaments"],
    gitUrl: "https://docs.google.com/forms/d/1gk0eg0Pi6coMPjdAgZoCJU44i1Rvqy2-_PzQT7WC47c/edit",
    previewUrl: "/images/Tournaments/3rdIntraTournament.jpg",
  },
  {
    id: 3,
    title: "TZY CUP 2024",
    description: "TZY CUP 2024",
    image: "/images/Tournaments/TzyCup2024.jpg",
    tag: ["All", "Tournaments"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "TZY Social Game",
    description: "Social Game",
    image: "/images/Tournaments/SocialGame.jpg",
    tag: ["All", "Social Game"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectSection = () => {
  const [tag, setTag] = useState("All");

  const handleTagChange = (newTag: React.SetStateAction<string>) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

 



  return (
    <section id="projects" className="text-white scroll-mt-28">
      <h2 className="text-center text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
        Our Tournaments and Social Game
      </h2>
      <div className="text-black flex  flex-row items-center justify-center gap-2 py-6 ">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Tournaments"
          isSelected={tag === "Tournaments"}
        />
         <ProjectTag
          onClick={handleTagChange}
          name="Social Game"
          isSelected={tag === "Social Game"}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imgUrl={project.image}
            tag={project.tag}
            gitUrl={project.gitUrl}
            previewUrl={project.previewUrl}
            
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
