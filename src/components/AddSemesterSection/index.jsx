// using redux

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { fetchSemesters } from "../../redux/subjectsSlice";
import store from "../../redux/store";

const SemesterSections = () => {
  const dispatch = useDispatch();
  const [sectionTitle, setSectionTitle] = useState("");
  const semesters = useSelector((state) => state.subjects?.semesters || []); // Access semesters from Redux state
  const [semester, setSemester] = useState("2017-2021 BS-CS 7th Semester");
  const [capacity, setCapacity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([
    {
      title: "Section A",
      semester: "2020-2024 BS-CS 1st Semester",
      capacity: 30,
      status: true,
    },
    {
      title: "Section B",
      semester: "2020-2024 BS-CS 1st Semester",
      capacity: 25,
      status: true,
    },
    {
      title: "Section A",
      semester: "2018-2022 BS-IT 5th Semester",
      capacity: 20,
      status: false,
    },
    {
      title: "Section B",
      semester: "2018-2022 BS-IT 5th Semester",
      capacity: 35,
      status: false,
    },
  ]);

  const handleSave = () => {
    const newSection = {
      title: sectionTitle,
      semester,
      capacity: parseInt(capacity, 10) || 0,
      status: true,
    };
    setSections([...sections, newSection]);
    setSectionTitle("");
    setCapacity("");
  };

  const handleRemove = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleStatusChange = (index) => {
    setSections(
      sections.map((sec, i) =>
        i === index ? { ...sec, status: !sec.status } : sec
      )
    );
  };

  const filteredSections = sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchSemesters()); //  Dispatch action to fetch semesters
  }, [dispatch]);

  return (
    <div className="p-10 bg-gradient-to-r from-blue-50 to-indigo-50 h-screen  flex gap-6">
      <div className="bg-blue-100 p-4 rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Semester Section Registration
        </h2>
        <label className="block mb-2">Section Title</label>
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />

        <label className="block mt-4 mb-2">Select Semester</label>
        <select
          className="w-full p-2 rounded text-black"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {semesters.length > 0 ? (
            semesters.map((sem, index) => (
              <option key={index} value={sem}>
                {sem}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option> // ✅ Prevent crash when fetching
          )}
        </select>
        {/* <select
          className="w-full p-2 rounded text-black"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option>2017-2021 BS-CS 7th Semester</option>
          <option>2020-2024 BS-CS 1st Semester</option>
          <option>2018-2022 BS-IT 5th Semester</option>
        </select> */}

        <label className="block mt-4 mb-2">Enter Capacity</label>
        <input
          type="number"
          className="w-full p-2 rounded text-black"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <div className="flex mt-4 gap-2">
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 px-4 py-2 rounded"
            onClick={() => {
              setSectionTitle("");
              setCapacity("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg w-2/3">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Search</h2>
        <input
          type="text"
          placeholder="Search by Section or Semester"
          className="w-full p-2 rounded text-black mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="w-full bg-white text-black rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Section</th>
              <th className="p-2">Semester</th>
              <th className="p-2">Capacity</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections.map((sec, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2">{sec.title}</td>
                <td className="p-2">{sec.semester}</td>
                <td className="p-2">{sec.capacity}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={sec.status}
                    onChange={() => handleStatusChange(index)}
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 px-2 py-1 text-white rounded"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// export default SemesterSections;
const WrappedSemesterSections = () => (
  <Provider store={store}>
    <SemesterSections />
  </Provider>
);

export default WrappedSemesterSections;
