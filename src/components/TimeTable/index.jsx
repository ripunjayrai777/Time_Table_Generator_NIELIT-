import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { SiSession } from "react-icons/si";
import { GrHelpBook } from "react-icons/gr";
import { FaPersonChalkboard } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";

import { LuGraduationCap } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { AiOutlineBorderInner } from "react-icons/ai";
import { IoPrintOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const TimeTable = () => {
  const [dropdownOpenRL, setdropdownOpenRL] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const handleDropdownCloseRL = () => setdropdownOpenRL(false);
  const handleDropdownClose = () => setdropdownOpen(false);

  return (
    <>
      <div className="nav2 flex items-center justify-between gap-5 p-2 m-2 ml-7 mr-7">
        <Link to="/program" className="hover:text-blue-700">
          <IoBookOutline className="text-[40px] flex items-center justify-between " />
          Program
        </Link>
        <Link to="/session" className="hover:text-blue-700">
          <SiSession className="text-[40px] flex items-center justify-between" />
          Session
        </Link>
        <Link to="/subjects" className="hover:text-blue-700">
          <GrHelpBook className="text-[40px] flex items-center justify-between" />
          Subjects
        </Link>
        <Link to="/lecturers" className="hover:text-blue-700">
          <FaPersonChalkboard className="text-[40px] flex items-center justify-between" />
          Lecturers
        </Link>
        {/* Room and Lab Section */}

        <div className="relative">
          <button
            className="items-center text-[16px] gap-2 cursor-pointer hover:text-blue-700"
            onClick={() => setdropdownOpenRL(!dropdownOpenRL)}
          >
            <SiGoogleclassroom className="text-[40px] flex items-center justify-between" />{" "}
            Rooms/Labs
          </button>
          {dropdownOpenRL && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-40">
              <Link
                to="/rooms-labs/add-rooms"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownCloseRL}
              >
                Add Rooms
              </Link>
              <Link
                to="/rooms-labs/add-labs"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownCloseRL}
              >
                Add Labs
              </Link>
            </div>
          )}
        </div>

        {/* Semester section */}
        <div className="relative ">
          <button
            className="items-center text-[16px] gap-2 cursor-pointer hover:text-blue-700"
            onClick={() => setdropdownOpen(!dropdownOpen)}
          >
            <LuGraduationCap className="text-[40px] flex items-center justify-between" />{" "}
            Semester
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-55">
              <Link
                to="/semesters/new-semester"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownClose}
              >
                New Semester
              </Link>
              <Link
                to="/semesters/assign-semester-to-program"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownClose}
              >
                Assign Semester to Program
              </Link>
              <Link
                to="/semesters/add-semester-sections"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownClose}
              >
                Add Semester Sections
              </Link>

              <Link
                to="/semesters/add-subject-to-semester"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={handleDropdownClose}
              >
                Add Subject to Semester
              </Link>
            </div>
          )}
        </div>
        {/* Day Section */}
        <Link to="/days" className="hover:text-blue-700">
          <SlCalender className="text-[40px] flex items-center justify-between" />
          Days
        </Link>
        <Link to="/generate-table" className="hover:text-blue-700">
          <AiOutlineBorderInner className="text-[40px] flex items-center justify-between " />
          Generate Table
        </Link>
        <Link to="/print" className="hover:text-blue-700">
          <IoPrintOutline className="text-[40px] flex items-center justify-between" />
          Print
        </Link>
      </div>
    </>
  );
};

export default TimeTable;
