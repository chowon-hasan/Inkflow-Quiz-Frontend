"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/Redux_Store/store/store";
import { useAuthVerify } from "@/app/Hooks/useAuthVerify";
import { FaCrown, FaStar, FaMedal } from "react-icons/fa";

const LEVELS = [
  {
    group: "Alpha",
    order: 1,
    icon: <FaStar className="text-yellow-400 text-2xl" />,
    levels: ["Alpha 1", "Alpha 2"],
    color: "from-blue-400 via-blue-500 to-blue-700",
  },
  {
    group: "Sigma",
    order: 2,
    icon: <FaMedal className="text-purple-400 text-2xl" />,
    levels: ["Sigma 1", "Sigma 2"],
    color: "from-purple-400 via-purple-500 to-purple-700",
  },
  {
    group: "Merit",
    order: 3,
    icon: <FaCrown className="text-white text-2xl" />,
    levels: ["Merit 1", "Merit 2"],
    color: "from-yellow-400 via-yellow-500 to-yellow-700",
  },
];

const LEVEL_ORDER: Record<string, number> = {
  "Alpha 1": 1,
  "Alpha 2": 1,
  "Sigma 1": 2,
  "Sigma 2": 2,
  "Merit 1": 3,
  "Merit 2": 3,
};

const BUTTON_CONFIG: Record<
  string,
  { text: string; color: string; link: (uid: string) => string }
> = {
  Alpha: {
    text: "Start Assessment",
    color: "bg-white/90 hover:bg-green-500 hover:text-white text-green-700",
    link: (uid) => `/assessment/${uid}?level=alpha`,
  },
  Sigma: {
    text: "Proceed to Sigma Assessment",
    color: "bg-purple-600 hover:bg-purple-700 text-white",
    link: (uid) => `/readme`,
  },
  Merit: {
    text: "Take Final Assessment",
    color: "bg-yellow-500 hover:bg-yellow-600 text-white",
    link: (uid) => `/`,
  },
};


const LevelCards = () => {
  const { userData, verifyAuth } = useAuthVerify();
   const [userCurrentLevel, setUserCurrentLevel] = useState<string>("");
  const user = useAppSelector((state) => state.auth.user);

  const userLevelOrder = LEVEL_ORDER[userCurrentLevel] || 1;

        useEffect(() => {
          verifyAuth();
          setUserCurrentLevel(userData?.level);
          
          // eslint-disable-next-line
        }, [userData]);

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-10">
      {LEVELS.map((group) => {
        const isActive = group.order <= userLevelOrder;
        const isCurrent = group.order === userLevelOrder;

        return (
          <div
            key={group.group}
            className={`
              flex-1 min-w-[350px] max-w-xs rounded-3xl shadow-2xl p-7 border-0
              bg-gradient-to-br ${group.color}
              relative overflow-hidden
              transition-all duration-300
              ${isActive ? "scale-105 ring-4 ring-green-400" : "opacity-60"}
              hover:scale-105 hover:ring-2 hover:ring-blue-300
            `}
            style={{
              backdropFilter: "blur(8px)",
              boxShadow: isActive
                ? "0 8px 32px 0 rgba(34,197,94,0.25)"
                : "0 4px 16px 0 rgba(0,0,0,0.10)",
            }}
          >
            {/* Icon */}
            <div className="absolute top-5 right-5 opacity-80">
              {group.icon}
            </div>
            {/* Group Name */}
            <h3 className="text-2xl font-extrabold mb-3 tracking-wide drop-shadow">
              {group.group} Levels
            </h3>
            {/* Levels */}
            <div className="flex flex-col gap-2 mb-6">
              {group.levels.map((level) => (
                <span
                  key={level}
                  className={`
                    px-4 py-2 rounded-full text-base font-semibold shadow
                    ${
                      userCurrentLevel === level
                        ? "bg-green-500 text-white border-2 border-white"
                        : "bg-white/30 text-white border border-white/20"
                    }
                  `}
                >
                  {level}
                  {userCurrentLevel === level && (
                    <span className="ml-2 text-xs font-bold animate-pulse">
                      (Your Level)
                    </span>
                  )}
                </span>
              ))}
            </div>
            {/* Badge */}
            {isActive && (
              <div className="mb-4">
                <span
                  className={`inline-block px-4 py-1 rounded-full font-semibold text-xs shadow
                  ${
                    isCurrent
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-green-700"
                  }
                `}
                >
                  {isCurrent ? "Eligible" : "Completed"}
                </span>
              </div>
            )}
            {/* Start Assessment Button only for current group */}
            {isCurrent && (
              <Link
                href={BUTTON_CONFIG[group.group].link(user?.uid || "")}
                className={`block w-full mt-2 font-bold py-2 rounded-xl text-center shadow-lg transition-all duration-200
      ${BUTTON_CONFIG[group.group].color}
    `}
              >
                {BUTTON_CONFIG[group.group].text}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LevelCards;
