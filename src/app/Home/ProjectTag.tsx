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
      className={`${buttonStyles} rounded-full border-2 px-6 py-2 cursor-pointer text-xl`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
