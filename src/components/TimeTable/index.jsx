import React, { useState, useRef, useEffect } from "react";
import { IoBookOutline, IoPrintOutline } from "react-icons/io5";
import { SiSession, SiGoogleclassroom } from "react-icons/si";
import { GrHelpBook } from "react-icons/gr";
import { FaPersonChalkboard } from "react-icons/fa6";
import { LuGraduationCap } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { AiOutlineBorderInner } from "react-icons/ai";
import { Link } from "react-router-dom";

const TimeTable = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    roomsLabs: false,
    semester: false,
    days: false,
  });

  const dropdownRefs = {
    roomsLabs: useRef(null),
    semester: useRef(null),
    days: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach((key) => {
        if (
          dropdownRefs[key].current &&
          !dropdownRefs[key].current.contains(event.target)
        ) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="nav2 flex flex-wrap items-center justify-between gap-5 p-4 bg-white shadow-md rounded-lg m-4">
      {[
        { to: "/program", icon: <IoBookOutline />, label: "Program" },
        { to: "/session", icon: <SiSession />, label: "Session" },
        { to: "/subjects", icon: <GrHelpBook />, label: "Subjects" },
        { to: "/lecturers", icon: <FaPersonChalkboard />, label: "Lecturers" },
      ].map(({ to, icon, label }) => (
        <Link
          key={label}
          to={to}
          className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition duration-200"
        >
          <span className="text-3xl mb-1">{icon}</span>
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}

      {/* Dropdowns */}
      {[
        {
          key: "roomsLabs",
          icon: <SiGoogleclassroom />,
          label: "Rooms/Labs",
          links: [
            { to: "/rooms-labs/add-rooms", text: "Add Rooms" },
            { to: "/rooms-labs/add-labs", text: "Add Labs" },
          ],
        },
        {
          key: "semester",
          icon: <LuGraduationCap />,
          label: "Semester",
          links: [
            { to: "/semesters/new-semester", text: "New Semester" },
            {
              to: "/semesters/assign-semester-to-program",
              text: "Assign Semester",
            },
            { to: "/semesters/add-semester-sections", text: "Add Sections" },
            { to: "/semesters/add-subject-to-semester", text: "Add Subject" },
          ],
        },
        {
          key: "days",
          icon: <SlCalender />,
          label: "Days",
          links: [
            { to: "/days/selection", text: "Days Selection" },
            { to: "/days/slot", text: "Day & Time Slot" },
          ],
        },
      ].map(({ key, icon, label, links }) => (
        <div className="relative" ref={dropdownRefs[key]} key={key}>
          <button
            onClick={() => toggleDropdown(key)}
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <span className="text-3xl mb-1">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </button>
          {dropdownOpen[key] && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg w-44 z-10">
              {links.map(({ to, text }) => (
                <Link
                  key={text}
                  to={to}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() =>
                    setDropdownOpen((prev) => ({ ...prev, [key]: false }))
                  }
                >
                  {text}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Other Links */}
      {[
        {
          to: "/generate-table",
          icon: <AiOutlineBorderInner />,
          label: "Generate Table",
        },
        { to: "/print", icon: <IoPrintOutline />, label: "Print" },
      ].map(({ to, icon, label }) => (
        <Link
          key={label}
          to={to}
          className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition duration-200"
        >
          <span className="text-3xl mb-1">{icon}</span>
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default TimeTable;
