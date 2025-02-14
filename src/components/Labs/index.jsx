// import React, { useState } from "react";
// import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";

// const LabManagementApp = () => {
//   const [labs, setLabs] = useState([]);
//   const [labNo, setLabNo] = useState("");
//   const [labCapacity, setLabCapacity] = useState("");
//   const [labStatus, setLabStatus] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleAddLab = () => {
//     if (labNo && labCapacity) {
//       setLabs([
//         ...labs,
//         {
//           id: labs.length + 1,
//           lab: labNo,
//           capacity: labCapacity,
//           status: labStatus,
//         },
//       ]);
//       clearForm();
//     } else {
//       alert("Please fill all fields.");
//     }
//   };

//   const clearForm = () => {
//     setLabNo("");
//     setLabCapacity("");
//     setLabStatus(false);
//   };

//   const handleDelete = (id) => {
//     setLabs(labs.filter((lab) => lab.id !== id));
//   };

//   const toggleStatus = (id) => {
//     setLabs(
//       labs.map((lab) => (lab.id === id ? { ...lab, status: !lab.status } : lab))
//     );
//   };

//   const filteredLabs = labs.filter(
//     (lab) =>
//       lab.lab.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       lab.capacity.includes(searchQuery)
//   );

//   return (
//     <div className="min-h-screen bg-blue-50 p-10 flex justify-center items-center">
//       <div className="flex gap-8 w-full max-w-6xl">
//         {/* Enter Lab Details Section */}
//         <div className="bg-blue-100 shadow-lg rounded-2xl p-6 w-1/2">
//           <h2 className="text-2xl font-bold text-blue-700 mb-4">
//             Enter Lab Details
//           </h2>
//           <input
//             type="text"
//             placeholder="Lab No"
//             value={labNo}
//             onChange={(e) => setLabNo(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="number"
//             placeholder="Lab Capacity"
//             value={labCapacity}
//             onChange={(e) => setLabCapacity(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <div className="flex items-center mb-4">
//             <label className="mr-2">Lab Status (Active):</label>
//             <input
//               type="checkbox"
//               checked={labStatus}
//               onChange={(e) => setLabStatus(e.target.checked)}
//               className="h-4 w-4"
//             />
//           </div>
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={clearForm}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600"
//             >
//               <FaEraser /> Clear
//             </button>
//             <button
//               onClick={handleAddLab}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
//             >
//               <FaSave /> Save
//             </button>
//           </div>
//         </div>

//         {/* Lab List Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 w-1/2">
//           <h2 className="text-2xl font-bold text-green-700 mb-4">All Labs</h2>
//           <input
//             type="text"
//             placeholder="Search by Lab or Capacity"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Lab</th>
//                 <th className="border p-2">Capacity</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLabs.length > 0 ? (
//                 filteredLabs.map((lab) => (
//                   <tr key={lab.id} className="even:bg-gray-50">
//                     <td className="border p-2 text-center">{lab.id}</td>
//                     <td className="border p-2 text-center">{lab.lab}</td>
//                     <td className="border p-2 text-center">{lab.capacity}</td>
//                     <td className="border p-2 text-center">
//                       <input
//                         type="checkbox"
//                         checked={lab.status}
//                         onChange={() => toggleStatus(lab.id)}
//                         className="h-4 w-4"
//                       />
//                     </td>
//                     <td className="border p-2 text-center">
//                       <button
//                         onClick={() => handleDelete(lab.id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-2 hover:bg-red-600"
//                       >
//                         <FaTrashAlt /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="border p-4 text-center">
//                     No labs found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LabManagementApp;

import React, { useState } from "react";
import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";

const LabManagementApp = () => {
  const [labs, setLabs] = useState([]);
  const [labName, setLabName] = useState("");
  const [labNo, setLabNo] = useState("");
  const [labCapacity, setLabCapacity] = useState("");
  const [labStatus, setLabStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddLab = () => {
    if (labName && labNo && labCapacity) {
      setLabs([
        ...labs,
        {
          id: labs.length + 1,
          name: labName,
          lab: labNo,
          capacity: labCapacity,
          status: labStatus,
        },
      ]);
      clearForm();
    } else {
      alert("Please fill all fields.");
    }
  };

  const clearForm = () => {
    setLabName("");
    setLabNo("");
    setLabCapacity("");
    setLabStatus(false);
  };

  const handleDelete = (id) => {
    setLabs(labs.filter((lab) => lab.id !== id));
  };

  const toggleStatus = (id) => {
    setLabs(
      labs.map((lab) => (lab.id === id ? { ...lab, status: !lab.status } : lab))
    );
  };

  const filteredLabs = labs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.lab.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.capacity.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Enter Lab Details Section */}
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Enter Lab Details
          </h2>
          <input
            type="text"
            placeholder="Lab Name"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Lab No"
            value={labNo}
            onChange={(e) => setLabNo(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Lab Capacity"
            value={labCapacity}
            onChange={(e) => setLabCapacity(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Lab Status (Active):</label>
            <input
              type="checkbox"
              checked={labStatus}
              onChange={(e) => setLabStatus(e.target.checked)}
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
              onClick={handleAddLab}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>

        {/* Lab List Section */}
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            All Labs
          </h2>
          <input
            type="text"
            placeholder="Search by Lab Name, Number, or Capacity"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border p-2">ID</th>
                <th className="border p-2">Lab Name</th>
                <th className="border p-2">Lab No</th>
                <th className="border p-2">Capacity</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabs.length > 0 ? (
                filteredLabs.map((lab) => (
                  <tr key={lab.id} className="even:bg-gray-50">
                    <td className="border p-2 text-center">{lab.id}</td>
                    <td className="border p-2 text-center">{lab.name}</td>
                    <td className="border p-2 text-center">{lab.lab}</td>
                    <td className="border p-2 text-center">{lab.capacity}</td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={lab.status}
                        onChange={() => toggleStatus(lab.id)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(lab.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-2 hover:bg-red-600"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border p-4 text-center">
                    No labs found.
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

export default LabManagementApp;
