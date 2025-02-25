import React, { useState, useRef, useEffect } from "react";
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
  const [dropdownOpenSemester, setdropdownOpenSemester] = useState(false);
  const [dropdownOpenDays, setdropdownOpenDays] = useState(false);

  // Refs for detecting outside clicks
  const dropdownRefRL = useRef(null);
  const dropdownRefSemester = useRef(null);
  const dropdownRefDays = useRef(null);

  // Handle clicks outside for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefRL.current &&
        !dropdownRefRL.current.contains(event.target)
      ) {
        setdropdownOpenRL(false);
      }
      if (
        dropdownRefSemester.current &&
        !dropdownRefSemester.current.contains(event.target)
      ) {
        setdropdownOpenSemester(false);
      }
      if (
        dropdownRefDays.current &&
        !dropdownRefDays.current.contains(event.target)
      ) {
        setdropdownOpenDays(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="nav2 flex items-center justify-between gap-5 p-2 m-2 ml-7 mr-7">
        <Link to="/program" className="hover:text-[#1976d2]">
          <IoBookOutline className="text-[40px]" />
          Program
        </Link>
        <Link to="/session" className="hover:text-[#1976d2]">
          <SiSession className="text-[40px]" />
          Session
        </Link>
        <Link to="/subjects" className="hover:text-[#1976d2]">
          <GrHelpBook className="text-[40px]" />
          Subjects
        </Link>
        <Link to="/lecturers" className="hover:text-[#1976d2]">
          <FaPersonChalkboard className="text-[40px]" />
          Lecturers
        </Link>

        {/* Rooms/Labs Dropdown */}
        <div className="relative" ref={dropdownRefRL}>
          <button
            className="items-center text-[16px] gap-2 cursor-pointer hover:text-[#1976d2]"
            onClick={() => setdropdownOpenRL(!dropdownOpenRL)}
          >
            <SiGoogleclassroom className="text-[40px]" /> Rooms/Labs
          </button>
          {dropdownOpenRL && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-40">
              <Link
                to="/rooms-labs/add-rooms"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenRL(false)}
              >
                Add Rooms
              </Link>
              <Link
                to="/rooms-labs/add-labs"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenRL(false)}
              >
                Add Labs
              </Link>
            </div>
          )}
        </div>

        {/* Semester Dropdown */}
        <div className="relative" ref={dropdownRefSemester}>
          <button
            className="items-center text-[16px] gap-2 cursor-pointer hover:text-[#1976d2]"
            onClick={() => setdropdownOpenSemester(!dropdownOpenSemester)}
          >
            <LuGraduationCap className="text-[40px]" /> Semester
          </button>
          {dropdownOpenSemester && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-55">
              <Link
                to="/semesters/new-semester"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenSemester(false)}
              >
                New Semester
              </Link>
              <Link
                to="/semesters/assign-semester-to-program"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenSemester(false)}
              >
                Assign Semester to Program
              </Link>
              <Link
                to="/semesters/add-semester-sections"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenSemester(false)}
              >
                Add Semester Sections
              </Link>
              <Link
                to="/semesters/add-subject-to-semester"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenSemester(false)}
              >
                Add Subject to Semester
              </Link>
            </div>
          )}
        </div>

        {/* Days Dropdown */}
        <div className="relative" ref={dropdownRefDays}>
          <button
            className="items-center text-[16px] gap-2 cursor-pointer hover:text-[#1976d2]"
            onClick={() => setdropdownOpenDays(!dropdownOpenDays)}
          >
            <SlCalender className="text-[40px]" /> Days
          </button>
          {dropdownOpenDays && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-40">
              <Link
                to="/days/selection"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenDays(false)}
              >
                Days Selection
              </Link>
              <Link
                to="/days/slot"
                className="block px-4 py-2 hover:bg-gray-100 text-[14px]"
                onClick={() => setdropdownOpenDays(false)}
              >
                Day & Time Slot
              </Link>
            </div>
          )}
        </div>

        {/* Generate Table Section */}
        <Link to="/generate-table" className="hover:text-[#1976d2]">
          <AiOutlineBorderInner className="text-[40px]" />
          Generate Table
        </Link>
        <Link to="/print" className="hover:text-[#1976d2]">
          <IoPrintOutline className="text-[40px]" />
          Print
        </Link>
      </div>
    </>
  );
};

export default TimeTable;
