import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../Store";
import { FaSave, FaEraser, FaTrash } from "react-icons/fa";

const ProgramSemesterManagementApp = () => {
  const sessions = ["2016-2020", "2018-2022", "2020-2024"];
  const programs = ["BS-CS", "BS-IT", "PhD-CS"];
  const semesters = ["1st Semester", "2nd Semester", "3rd Semester"];

  const [title, setTitle] = useState("");
  const [session, setSession] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState(false);
  const [programList, setProgramList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    if (!title || !session || !program || !semester || !capacity) {
      alert("Please fill all fields");
    } else {
      const newProgram = {
        title: `${title} - ${session} - ${program} - ${semester}`,
        session,
        program,
        semester,
        capacity,
        status,
      };
      setProgramList([...programList, newProgram]);
      alert("Save Successfully!");
      clearForm();
    }
  };

  const handleRemove = (index) => {
    const updatedList = programList.filter((_, i) => i !== index);
    setProgramList(updatedList);
  };

  const clearForm = () => {
    setTitle("");
    setSession("");
    setProgram("");
    setSemester("");
    setCapacity("");
    setStatus(false);
  };

  const filteredProgramList = programList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Enter Program Semester Details
          </h2>
          <div className="flex flex-col grid  gap-4">
            <input
              type="text"
              placeholder="Program Semester Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            >
              <option value="">Select Session</option>
              {sessions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            >
              <option value="">Select Program</option>
              {programs.map((program, index) => (
                <option key={index} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            >
              <option value="">Select Semester</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Enter Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
            <div className="flex items-center">
              <label className="mr-2">Program Semester Status:</label>
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={clearForm}
              className="bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-700"
            >
              <FaEraser /> Clear
            </button>
            <button
              onClick={handleAdd}
              className="bg-[#1976d2] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-[#1976d2] transition-all"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
            All Program Semester List
          </h2>
          <input
            type="text"
            placeholder="Search Program Semester"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />
          <div className="bg-white p-6 rounded-md shadow-lg">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-blue-100 text-gray-600">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Capacity</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgramList.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">{item.capacity}</td>
                    <td className="border p-2">{item.status ? "✔" : "✘"}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <ProgramSemesterManagementApp />
  </Provider>
);

export default App;
