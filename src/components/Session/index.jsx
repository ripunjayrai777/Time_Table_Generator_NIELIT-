import React, { useState } from "react";
import { FaPlus, FaSearch, FaTrashAlt, FaSave, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

function Session() {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [sessionStatus, setSessionStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [sessions, setSessions] = useState([
    { id: 1, title: "2020-2024", status: true },
    { id: 2, title: "2021-2025", status: true },
    { id: 3, title: "2022-2026", status: true },
    { id: 4, title: "2019-2023", status: false },
  ]);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  };

  const handleSave = () => {
    if (startYear && endYear && parseInt(endYear) > parseInt(startYear)) {
      const newSession = `${startYear}-${endYear}`;
      setSessions([
        ...sessions,
        { id: sessions.length + 1, title: newSession, status: sessionStatus },
      ]);
      setStartYear("");
      setEndYear("");
      setSessionStatus(false);
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setSessions(sessions.filter((session) => session.id !== id));
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      searchTerm === "" ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && session.status) ||
      (statusFilter === "Inactive" && !session.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className=" min-h-screen bg-blue-50 p-10">
      <div className="flex grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Form Section */}

        <div className=" bg-blue-100 shadow-xl rounded-md p-5">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Add New Session
          </h3>
          <label className="block text-gray-600 mb-2">Start Year:</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Year</option>
            {generateYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label className="block text-gray-600 mb-2">End Year:</label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Year</option>
            {generateYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={sessionStatus}
              onChange={() => setSessionStatus(!sessionStatus)}
              className="mr-2 accent-indigo-600"
            />
            <span className="text-gray-600">Session Status (Active)</span>
          </label>

          <div className="flex justify-between gap-2">
            <button
              onClick={handleSave}
              className="flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
            >
              <FaSave className="mr-2" />
              Save
            </button>
          </div>
        </div>

        {/* Session List Section */}

        <div className=" bg-white shadow-xl rounded-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-green-600">
            Manage Sessions
          </h3>

          {/* Filter Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by session year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 py-2 px-6 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Display Sessions */}
          <motion.div layout className="grid grid-cols-1 gap-2">
            {filteredSessions.map((session) => (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2 border bg-blue-50 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold">{session.title}</h4>
                  <span
                    className={`text-sm ${
                      session.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {session.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(session.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  <FaTrashAlt />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {filteredSessions.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No matching sessions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Session;
