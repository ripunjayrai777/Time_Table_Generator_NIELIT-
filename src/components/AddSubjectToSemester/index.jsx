// //Subject to Semesters...

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { fetchSubjects } from "../../redux/subjectsSlice";
import { FaSave, FaEraser, FaTrash } from "react-icons/fa";

const SemesterSubjects = () => {
  const dispatch = useDispatch();
  const { subjects, status } = useSelector((state) => state.subjects);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleSave = () => {
    if (!subjectTitle || !semester || !selectedSubject) {
      alert("Please fill all fields");
      return;
    }
    const newEntry = {
      subjectTitle,
      semester,
      selectedSubject,
      status: "Active",
    };
    setSavedData([...savedData, newEntry]);
    setSubjectTitle("");
    setSemester("");
    setSelectedSubject("");
    alert("Saved Successfully!");
  };

  const handleRemove = (index) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedData);
  };

  const handleStatusChange = (index) => {
    const updatedData = savedData.map((item, i) =>
      i === index
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    );
    setSavedData(updatedData);
  };

  const filteredSavedData = savedData.filter((item) =>
    item.subjectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Semester Subject Registration
          </h2>
          <input
            type="text"
            placeholder="Subject Title"
            value={subjectTitle}
            onChange={(e) => setSubjectTitle(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
          />
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-2 border rounded-md text-black mt-4"
          >
            <option value="">Select Semester</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-md text-black mt-4"
          >
            <option value="">Select Subject</option>
            <option value="Demo1">Demo1 Subject</option>
            <option value="Demo2">Demo2 Subject</option>
            {subjects.map((sub, index) => (
              <option key={index} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setSubjectTitle("");
                setSemester("");
                setSelectedSubject("");
              }}
              className="bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-700"
            >
              <FaEraser /> Clear
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>

        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Saved Subjects
          </h2>
          <input
            type="text"
            placeholder="Search Saved Subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-black"
          />
          <table className="w-full border-collapse border border-gray-400 mb-6">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="border p-2">Subject Title</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Selected Subject</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSavedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No data saved yet.
                  </td>
                </tr>
              ) : (
                filteredSavedData.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{item.subjectTitle}</td>
                    <td className="border p-2">{item.semester}</td>
                    <td className="border p-2">{item.selectedSubject}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleStatusChange(index)}
                        className={`px-4 py-1 rounded-md text-white ${
                          item.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleRemove(index)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-red-800"
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <SemesterSubjects />
  </Provider>
);

export default App;
