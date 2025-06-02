import React from "react";

interface ProjectTagProps {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-black bg-[#C4B3B7] border-black"
    : "text-gray-500 border-gray-500 hover:border-gray-700";

  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-4 sm:px-6 py-1.5 sm:py-2 text-base sm:text-xl cursor-pointer transition`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
