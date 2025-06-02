import React from "react";

const achievementsList = [
  {
    metric: "Tournaments",
    value: "10+",
  },
  {
    metric: "Players",
    value: "300+",
  },
  {
    metric: "Years",
    value: "10+",
  },
];

const AchievementsSections = () => {
  return (
    <div className="py-8 px-4 sm:py-16 sm:px-8 lg:px-16">
      <div className="border border-[#33353F] rounded-md py-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-0">
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-black text-3xl sm:text-4xl font-bold">
              {achievement.value}
            </h2>
            <p className="text-gray-700 text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSections;
