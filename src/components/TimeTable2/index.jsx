import React from "react";
import { IoBookOutline, IoPrintOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { AiOutlineBorderInner } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const TimeTable2 = () => {
  const location = useLocation();

  const navItems = [
    { to: "/room", icon: <SiGoogleclassroom />, label: "Rooms" },
    { to: "/days", icon: <SlCalender />, label: "Days" },
    { to: "/lessons", icon: <IoBookOutline />, label: "Lessons" },
    {
      to: "/generate-table",
      icon: <AiOutlineBorderInner />,
      label: "Generate",
    },
    { to: "/print", icon: <IoPrintOutline />, label: "Print" },
  ];

  return (
    <div className="w-full bg-blue-50 shadow-md rounded-lg p-4">
      <div className="flex justify-evenly flex-wrap">
        {navItems.map(({ to, icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`group flex flex-col items-center gap-2 transition ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <div
                className={`p-4 rounded-full text-2xl transition ${
                  isActive
                    ? "bg-blue-100"
                    : "bg-gray-100 group-hover:bg-blue-100"
                }`}
              >
                {icon}
              </div>
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TimeTable2;
