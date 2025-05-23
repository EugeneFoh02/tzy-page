import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  tag?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
}) => {
  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/links"
          >
            <CodeBracketIcon className="text-[#ADB7BE] h-10 w-10 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-1/2 group-hover/links:text-white" />
          </Link>
          <Link
            href={previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/links"
          >
            <EyeIcon className="text-[#ADB7BE] h-10 w-10 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-1/2 group-hover/links:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-2 bg-white py-6 px-4">
        <h5 className="text-xl font-semibold mb-2 text-black">{title}</h5>
        <p className="text-gray-700 ">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
