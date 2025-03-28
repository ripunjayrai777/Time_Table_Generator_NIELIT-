import React, { useState, useEffect } from "react";
import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";
import api from "../Store/apiClient";

function LecturerManagement() {
  const [lecturerName, setLecturerName] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");
  const [lecturerDepartment, setLecturerDepartment] = useState("");
  const [lecturerSubject, setLecturerSubject] = useState("");
  const [lecturerStatus, setLecturerStatus] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState([]);
  
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      
      const response = await api.get("/subject/get-subjects", {
        headers: {Authorization:`Bearer ${localStorage.getItem("jwt")}`,}
      });
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching Subjects:", error);
      toast.error("Failed to fetch subjects!");
    }
   
  };
  

  const handleSave = () => {
    if (!lecturerName || !lecturerEmail || !lecturerDepartment || !lecturerSubject) {
      alert("Please fill all fields.");
      return;
    }

    const newLecturer = {
      id: lecturers.length + 1,
      name: lecturerName,
      email: lecturerEmail,
      department: lecturerDepartment,
      subject: lecturerSubject,
      status: lecturerStatus,
    };

    setLecturers([...lecturers, newLecturer]);
    clearForm();
  };

  const clearForm = () => {
    setLecturerName("");
    setLecturerEmail("");
    setLecturerDepartment("");
    setLecturerSubject("");
    setLecturerStatus(false);
  };

  const handleDelete = (id) => {
    setLecturers(lecturers.filter((lecturer) => lecturer.id !== id));
  };

  const toggleStatus = (id) => {
    setLecturers(
      lecturers.map((lecturer) =>
        lecturer.id === id ? { ...lecturer, status: !lecturer.status } : lecturer
      )
    );
  };

  const filteredLecturers = lecturers.filter(
    (lecturer) =>
      lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Enter Lecturer Details
          </h2>

          <label className="block mb-3 font-semibold text-gray-800">Lecturer Name:</label>
          <input type="text" value={lecturerName} onChange={(e) => setLecturerName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]" placeholder="Enter lecturer name" />

          <label className="block mt-4 mb-3 font-semibold text-gray-800">Email:</label>
          <input type="email" value={lecturerEmail} onChange={(e) => setLecturerEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]" placeholder="Enter email" />

          <label className="block mt-4 mb-3 font-semibold text-gray-800">Department:</label>
          <input type="text" value={lecturerDepartment} onChange={(e) => setLecturerDepartment(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]" placeholder="Enter department" />

          <label className="block mt-4 mb-3 font-semibold text-gray-800">Subject:</label>
          
          <select value={lecturerSubject} onChange={(e) => setLecturerSubject(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]">
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.subjectName}>
                {subject.subjectName} <span className="!text-green-500">({subject.code})</span>
              </option>
            ))}
          </select>

          <label className="flex items-center mt-4 mb-6 font-semibold text-gray-800">
            <input type="checkbox" checked={lecturerStatus} onChange={() => setLecturerStatus(!lecturerStatus)} className="mr-2" />
            Lecturer Status (Active)
          </label>

          <div className="flex gap-4">
            <button onClick={clearForm} className="flex items-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md">
              <FaEraser /> Clear
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-3 bg-[#1976d2] hover:bg-white text-white hover:text-[#1976d2] transition-all rounded-md shadow-md">
              <FaSave /> Save
            </button>
          </div>
        </div>

        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#1976d2]">All Lecturers</h3>
          <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
          {filteredLecturers.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">ID</th>
                  <th className="p-4">Lecturer</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{lecturer.id}</td>
                    <td className="p-4">{lecturer.name}</td>
                    <td className="p-4">{lecturer.email}</td>
                    <td className="p-4">{lecturer.department}</td>
                    <td className="p-4">{lecturer.subject}</td>
                    <td className="p-4">
                      <input type="checkbox" checked={lecturer.status} onChange={() => toggleStatus(lecturer.id)} className="w-5 h-5" />
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(lecturer.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No lecturers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LecturerManagement;
