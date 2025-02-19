// import React, { useState } from "react";
// import { FaPlusCircle, FaTrashAlt, FaSearch } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Program() {
//   const [programs, setPrograms] = useState([]);
//   const [newProgram, setNewProgram] = useState("");
//   const [status, setStatus] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleAddProgram = () => {
//     if (newProgram.trim()) {
//       setPrograms([...programs, { name: newProgram, status }]);
//       setNewProgram("");
//       setStatus(false);
//       toast.success("Program added successfully!");
//     } else {
//       toast.error("Program name cannot be empty!");
//     }
//   };

//   const handleRemoveProgram = (index) => {
//     setPrograms(programs.filter((_, i) => i !== index));
//     toast.info("Program removed!");
//   };

//   const handleEditProgram = (index, updatedName) => {
//     const updatedPrograms = [...programs];
//     updatedPrograms[index].name = updatedName;
//     setPrograms(updatedPrograms);
//     toast.success("Program updated!");
//   };

//   const filteredPrograms = programs.filter((program) =>
//     program.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const toggleSorting = () => {
//     setPrograms((prev) =>
//       [...prev].sort((a, b) => Number(b.status) - Number(a.status))
//     );
//   };

//   const activeProgramsCount = programs.filter(
//     (program) => program.status
//   ).length;

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
//       <ToastContainer />

//       {/* Form Section */}
//       <div className="bg-white shadow-xl rounded-md p-8 max-w-md mx-auto mb-10">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//           Create a New Program
//         </h2>
//         <label className="block text-gray-600 mb-2">Program Name:</label>
//         <input
//           type="text"
//           value={newProgram}
//           onChange={(e) => setNewProgram(e.target.value)}
//           className="w-full px-4 py-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           placeholder="Enter program name"
//         />
//         <label className="flex items-center text-gray-600 mb-4">
//           <input
//             type="checkbox"
//             checked={status}
//             onChange={(e) => setStatus(e.target.checked)}
//             className="mr-2 accent-blue-500"
//           />
//           Program Status (Active/Inactive)
//         </label>
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               setNewProgram("");
//               setStatus(false);
//             }}
//             className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg shadow-md"
//           >
//             Clear
//           </button>
//           <button
//             onClick={handleAddProgram}
//             className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center gap-2"
//           >
//             <FaPlusCircle />
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Search and Summary Section */}
//       <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
//         <div className="flex items-center bg-white shadow-md rounded-lg p-2 w-full">
//           <FaSearch className="text-gray-500 mr-3" />
//           <input
//             type="text"
//             placeholder="Search programs..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 focus:outline-none"
//           />
//         </div>
//         <div className="ml-4 text-gray-700">
//           <p className="font-semibold">
//             Active Programs: {activeProgramsCount}
//           </p>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white shadow-xl rounded-md p-8 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//           Program List
//         </h2>
//         {filteredPrograms.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-100">
//                   <th className="border p-2 text-left text-gray-700">ID</th>
//                   <th className="border p-2 text-left text-gray-700">
//                     Program
//                   </th>
//                   <th
//                     className="border p-2 text-left text-gray-700 cursor-pointer hover:text-blue-500"
//                     onClick={toggleSorting}
//                   >
//                     Status
//                   </th>
//                   <th className="border p-2 text-left text-gray-700">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPrograms.map((program, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="border p-2">{index + 1}</td>
//                     <td className="border p-2">
//                       {editingIndex === index ? (
//                         <input
//                           type="text"
//                           value={program.name}
//                           onChange={(e) =>
//                             handleEditProgram(index, e.target.value)
//                           }
//                           onBlur={() => setEditingIndex(null)}
//                           className="w-full px-2 py-1 border focus:outline-none"
//                         />
//                       ) : (
//                         <span
//                           onDoubleClick={() => setEditingIndex(index)}
//                           className="cursor-pointer"
//                         >
//                           {program.name}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2">
//                       <span
//                         className={`px-3 py-1 rounded-full text-white ${
//                           program.status ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       >
//                         {program.status ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="border p-2">
//                       <button
//                         onClick={() => handleRemoveProgram(index)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
//                       >
//                         <FaTrashAlt />
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center">No programs found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Program;

import React, { useState } from "react";
import { FaPlusCircle, FaTrashAlt, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Program() {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState("");
  const [status, setStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddProgram = () => {
    if (newProgram.trim()) {
      setPrograms([...programs, { name: newProgram, status }]);
      setNewProgram("");
      setStatus(false);
      toast.success("Program added successfully!");
    } else {
      toast.error("Program name cannot be empty!");
    }
  };

  const handleRemoveProgram = (index) => {
    setPrograms(programs.filter((_, i) => i !== index));
    toast.info("Program removed!");
  };

  const handleEditProgram = (index, updatedName) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index].name = updatedName;
    setPrograms(updatedPrograms);
    toast.success("Program updated!");
  };

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSorting = () => {
    setPrograms((prev) =>
      [...prev].sort((a, b) => Number(b.status) - Number(a.status))
    );
  };

  const activeProgramsCount = programs.filter(
    (program) => program.status
  ).length;

  return (
    <div className="p-10 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
      <ToastContainer />

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form Section */}
        <div className="bg-blue-100 shadow-xl rounded-md p-5   max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Create a New Program
          </h2>
          <label className="block text-gray-600 mb-2">Program Name:</label>
          <input
            type="text"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Enter program name"
          />
          <label className="flex items-center text-gray-600 mb-4">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="mr-2 accent-blue-500"
            />
            Program Status (Active/Inactive)
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setNewProgram("");
                setStatus(false);
              }}
              className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg shadow-md"
            >
              Clear
            </button>
            <button
              onClick={handleAddProgram}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center gap-2"
            >
              <FaPlusCircle />
              Save
            </button>
          </div>
        </div>

        {/* Right Side: Search and Table */}
        <div className="flex-1">
          {/* Search and Summary Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-white shadow-md rounded-lg p-2 w-full">
              <FaSearch className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="ml-4 text-gray-700">
              <p className="font-semibold">
                Active Programs: {activeProgramsCount}
              </p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-xl rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-600">
              Program List
            </h2>
            {filteredPrograms.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border p-2 text-left text-gray-700">ID</th>
                      <th className="border p-2 text-left text-gray-700">
                        Program
                      </th>
                      <th
                        className="border p-2 text-left text-gray-700 cursor-pointer hover:text-blue-500"
                        onClick={toggleSorting}
                      >
                        Status
                      </th>
                      <th className="border p-2 text-left text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.map((program, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={program.name}
                              onChange={(e) =>
                                handleEditProgram(index, e.target.value)
                              }
                              onBlur={() => setEditingIndex(null)}
                              className="w-full px-2 py-1 border focus:outline-none"
                            />
                          ) : (
                            <span
                              onDoubleClick={() => setEditingIndex(index)}
                              className="cursor-pointer"
                            >
                              {program.name}
                            </span>
                          )}
                        </td>
                        <td className="border p-2">
                          <span
                            className={`px-3 py-1 rounded-full text-white ${
                              program.status ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {program.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="border p-2">
                          <button
                            onClick={() => handleRemoveProgram(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                          >
                            <FaTrashAlt />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No programs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Program;
