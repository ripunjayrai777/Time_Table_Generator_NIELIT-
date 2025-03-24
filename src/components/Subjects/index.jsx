// import React, { useState } from "react";
// import { FaSave, FaTrashAlt, FaEraser } from "react-icons/fa";

// function Subjects() {
//   const [subjectName, setSubjectName] = useState("");
//   const [subjectType, setSubjectType] = useState("");
//   const [crsHrs, setCrsHrs] = useState("");
//   const [subjects, setSubjects] = useState([]);

//   const handleSave = () => {
//     if (!subjectName || !subjectType || !crsHrs) {
//       alert("Please fill all fields...");
//       return;
//     }

//     const newSubject = {
//       id: subjects.length + 1,
//       title: subjectName,
//       type: subjectType,
//       credits: crsHrs,
//       status: true, // Default status is active
//     };

//     setSubjects([...subjects, newSubject]);
//     clearForm();
//   };

//   const handleDelete = (id) => {
//     setSubjects(subjects.filter((subject) => subject.id !== id));
//   };

//   const clearForm = () => {
//     setSubjectName("");
//     setSubjectType("");
//     setCrsHrs("");
//   };

//   const toggleStatus = (id) => {
//     setSubjects(
//       subjects.map((subject) =>
//         subject.id === id ? { ...subject, status: !subject.status } : subject
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-10">
//       <div className="grid grid-cols-12 gap-6">
//         {/* Form Section */}
//         <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//             Enter Subject Details
//           </h2>

//           <label className="block mb-3 font-semibold text-gray-700">
//             Subject Title:
//           </label>
//           <input
//             type="text"
//             value={subjectName}
//             onChange={(e) => setSubjectName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//             placeholder="Enter subject title"
//           />

//           <label className="block mt-4 mb-3 font-semibold text-gray-700">
//             Select Type:
//           </label>
//           <select
//             value={subjectType}
//             onChange={(e) => setSubjectType(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//           >
//             <option value="">--- Select ---</option>
//             <option value="Practical">Practical</option>
//             <option value="Non Practical">Non Practical</option>
//           </select>

//           <label className="block mt-4 mb-3 font-semibold text-gray-700">
//             Enter Credits:
//           </label>
//           <input
//             type="number"
//             min="1"
//             value={crsHrs}
//             onChange={(e) => setCrsHrs(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//           />

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={clearForm}
//               className="flex items-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md"
//             >
//               <FaEraser /> Clear
//             </button>
//             <button
//               onClick={handleSave}
//               className="flex items-center gap-2 px-4 py-3 bg-[#1976d2] hover:bg-white text-white hover:text-[#1976d2] rounded-md shadow-md"
//             >
//               <FaSave /> Save
//             </button>
//           </div>
//         </div>

//         {/* Subject List */}
//         <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
//           <h3 className="text-2xl font-semibold mb-4 text-[#1976d2]">
//             Subjects List
//           </h3>
//           {subjects.length > 0 ? (
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-4">ID</th>
//                   <th className="p-4">Title</th>
//                   <th className="p-4">Credits</th>
//                   <th className="p-4">Type</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subjects.map((subject) => (
//                   <tr key={subject.id} className="border-b hover:bg-gray-50">
//                     <td className="p-4">{subject.id}</td>
//                     <td className="p-4">{subject.title}</td>
//                     <td className="p-4">{subject.credits}</td>
//                     <td className="p-4">{subject.type}</td>
//                     <td className="p-4">
//                       <input
//                         type="checkbox"
//                         checked={subject.status}
//                         onChange={() => toggleStatus(subject.id)}
//                         className="w-5 h-5"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => handleDelete(subject.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No subjects found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Subjects;

import React, { useState, useEffect } from "react";
import { FaSave, FaTrashAlt, FaEraser } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../Store/apiClient";

function Subjects() {
  const [subjectName, setSubjectName] = useState("");
  const [code, setCode] = useState("");
  const [crsHrs, setCrsHrs] = useState("");
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
  

  const handleSave = async () => {
    if (!subjectName || !code || !crsHrs) {
      toast.error("Please fill all fields...");
      return;
    }

    
    const newSubject = {
      subjectName: subjectName,  
      code: code,
      crsHrs: crsHrs,           
      active: true,           
    };

    try {
      const response = await api.post("/subject/add-subject", newSubject);
      setSubjects([...subjects, response.data]);
      clearForm();
      toast.success("Subject added successfully!");
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error("Error adding subject!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subjects/${id}`); //api in backend in not available ....edit in last
      setSubjects(subjects.filter((subject) => subject.id !== id));// this feature will be add in future
      toast.success("Subject deleted successfully!");
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error("Error deleting subject!");
    }
  };

  const clearForm = () => {
    setSubjectName("");
    setCode("");
    setCrsHrs("");
  };

  const toggleStatus = async (id) => {
    try {
      const updatedSubjects = subjects.map((subject) =>
        subject.id === id ? { ...subject, status: !subject.status } : subject
      );
      setSubjects(updatedSubjects);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating subject status!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Enter Subject Details
          </h2>

          <label className="block mb-3 font-semibold text-gray-700">
            Subject Title:
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            placeholder="Enter subject title"
          />

          <label className="block mt-4 mb-3 font-semibold text-gray-700">
            Subject Code:
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            placeholder="Enter subject code"
          />

          <label className="block mt-4 mb-3 font-semibold text-gray-700">
            Enter Credits:
          </label>
          <input
            type="number"
            min="1"
            value={crsHrs}
            onChange={(e) => setCrsHrs(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />

          <div className="flex gap-4 mt-6">
            <button
              onClick={clearForm}
              className="flex items-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md"
            >
              <FaEraser /> Clear
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-3 bg-[#1976d2] hover:bg-white text-white hover:text-[#1976d2] rounded-md shadow-md"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>

        {/* Subject List */}
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#1976d2]">
            Subjects List
          </h3>
          {subjects.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">ID</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Credits</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{subject.id}</td>
                    <td className="p-4">{subject.subjectName}</td>
                    <td className="p-4">{subject.code}</td>
                    <td className="p-4">{subject.crsHrs}</td>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={subject.status}
                        onChange={() => toggleStatus(subject.id)}
                        className="w-5 h-5"
                      />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No subjects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subjects;