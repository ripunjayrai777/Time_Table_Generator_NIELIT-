import React, { useState } from "react";
import { FaSave, FaEraser } from "react-icons/fa";

const NewSemester = () => {
  const [semesters, setSemesters] = useState([]);
  const [semesterName, setSemesterName] = useState("");
  const [semesterStatus, setSemesterStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddSemester = () => {
    if (semesterName) {
      setSemesters([
        ...semesters,
        {
          id: semesters.length + 1,
          name: semesterName,
          status: semesterStatus,
        },
      ]);
      clearForm();
    } else {
      alert("Please enter the semester name.");
    }
  };

  const clearForm = () => {
    setSemesterName("");
    setSemesterStatus(false);
  };

  const toggleStatus = (id) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === id
          ? { ...semester, status: !semester.status }
          : semester
      )
    );
  };

  const filteredSemesters = semesters.filter((semester) =>
    semester.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Enter Semester Details Section */}
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Enter Semester Details
          </h2>
          <input
            type="text"
            placeholder="Semester Name"
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Semester Status (Active):</label>
            <input
              type="checkbox"
              checked={semesterStatus}
              onChange={(e) => setSemesterStatus(e.target.checked)}
              className="h-4 w-4"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={clearForm}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600"
            >
              <FaEraser /> Clear
            </button>
            <button
              onClick={handleAddSemester}
              className="bg-[#1976d2] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-[#1976d2] transition-all"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>

        {/* Semester List Section */}
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
            All Semesters List
          </h2>
          <input
            type="text"
            placeholder="Search by Semester Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border p-2">ID</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSemesters.length > 0 ? (
                filteredSemesters.map((semester) => (
                  <tr key={semester.id} className="even:bg-gray-50">
                    <td className="border p-2 text-center">{semester.id}</td>
                    <td className="border p-2 text-center">{semester.name}</td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={semester.status}
                        onChange={() => toggleStatus(semester.id)}
                        className="h-4 w-4"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border p-4 text-center">
                    No semesters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewSemester;
