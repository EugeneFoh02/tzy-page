import React from "react";

const achievementsList = [
  {
    metric: "Tournaments",
    value: "10+",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Players",
    value: "300+",
  },
  /* {
    metric: "Awards",
    value: "7+",
  }, */
  {
    metric: "Years",
    value: "10+",
  },
];
const AchievementsSections = () => {
  return (
    <div className="py-8 px-4 xl-gap-16 sm:py-16 xl:px-16">
      <div className="border border-[#33353F] rounded-md py-8 px-17 flex flex-row items-center justify-between">
      {achievementsList.map((achievement, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4"
          >
            <h2 className="text-black text-4xl font-bold">
              {achievement.value}
            </h2>
            <p className="text-gray-700 text-base">{achievement.metric}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default AchievementsSections;
