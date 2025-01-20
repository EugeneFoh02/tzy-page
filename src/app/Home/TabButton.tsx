import React, { ReactNode } from "react";

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-black border-b border-purple-500"
    : "text-gray-500";

  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-gray-700 ${buttonClasses}`}>
        {children}
      </p>
    </button>
  );
};

export default TabButton;
