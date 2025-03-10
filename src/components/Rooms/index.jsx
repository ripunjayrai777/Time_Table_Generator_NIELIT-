// import React, { useState } from "react";
// import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";

// const RoomManagementApp = () => {
//   const [rooms, setRooms] = useState([]);
//   const [roomNo, setRoomNo] = useState("");
//   const [roomCapacity, setRoomCapacity] = useState("");
//   const [roomStatus, setRoomStatus] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleAddRoom = () => {
//     if (roomNo && roomCapacity) {
//       setRooms([
//         ...rooms,
//         {
//           id: rooms.length + 1,
//           room: roomNo,
//           capacity: roomCapacity,
//           status: roomStatus,
//         },
//       ]);
//       clearForm();
//     } else {
//       alert("Please fill all fields.");
//     }
//   };

//   const clearForm = () => {
//     setRoomNo("");
//     setRoomCapacity("");
//     setRoomStatus(false);
//   };

//   const handleDelete = (id) => {
//     setRooms(rooms.filter((room) => room.id !== id));
//   };

//   const toggleStatus = (id) => {
//     setRooms(
//       rooms.map((room) =>
//         room.id === id ? { ...room, status: !room.status } : room
//       )
//     );
//   };

//   const filteredRooms = rooms.filter(
//     (room) =>
//       room.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       room.capacity.includes(searchQuery)
//   );

//   return (
//     <div className="min-h-screen bg-blue-50 p-10">
//       <div className="grid grid-cols-12 gap-6">
//         {/* Enter Room Details Section */}
//         <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Enter Room Details
//           </h2>
//           <input
//             type="text"
//             placeholder="Room No"
//             value={roomNo}
//             onChange={(e) => setRoomNo(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//           />
//           <input
//             type="number"
//             placeholder="Room Capacity"
//             value={roomCapacity}
//             onChange={(e) => setRoomCapacity(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//           />
//           <div className="flex items-center mb-4">
//             <label className="mr-2">Room Status (Active):</label>
//             <input
//               type="checkbox"
//               checked={roomStatus}
//               onChange={(e) => setRoomStatus(e.target.checked)}
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
//               onClick={handleAddRoom}
//               className="bg-[#1976d2] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-[#1976d2] transition-all"
//             >
//               <FaSave /> Save
//             </button>
//           </div>
//         </div>

//         {/* Room List Section */}
//         <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
//           <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
//             All Rooms
//           </h2>
//           <input
//             type="text"
//             placeholder="Search by Room or Capacity"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//           />
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className=" bg-blue-50">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Room</th>
//                 <th className="border p-2">Capacity</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRooms.length > 0 ? (
//                 filteredRooms.map((room) => (
//                   <tr key={room.id} className="even:bg-gray-50">
//                     <td className="border p-2 text-center">{room.id}</td>
//                     <td className="border p-2 text-center">{room.room}</td>
//                     <td className="border p-2 text-center">{room.capacity}</td>
//                     <td className="border p-2 text-center">
//                       <input
//                         type="checkbox"
//                         checked={room.status}
//                         onChange={() => toggleStatus(room.id)}
//                         className="h-4 w-4"
//                       />
//                     </td>
//                     <td className="border p-2 text-center">
//                       <button
//                         onClick={() => handleDelete(room.id)}
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
//                     No rooms found.
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

// export default RoomManagementApp;

import React, { useState, useEffect } from "react";
import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
// import api from "../../redux/apiClient";

const API_URL =
  "https://timetable-generator-43z2.onrender.com/api/room/allRooms";

const RoomManagementApp = () => {
  const [rooms, setRooms] = useState([]);
  const [roomNo, setRoomNo] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    // localStorage.getItem("accessToken") ||
    //   "eyJhbGciOiJIUzM4NCJ9.eyJlbWFpbCI6InJpcHVuamF5QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzQxNTg2NDE1LCJleHAiOjE3NDE2NzI4MTV9.iUG6TElJKZ5Ph5QuTRe_mXY6AotKYPP3rZCB_9SwU-111iNrsWxQQJrC7NInp70u";
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJlbWFpbCI6InJpcHVuamF5QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzQxNTg2NDE1LCJleHAiOjE3NDE2NzI4MTV9.iUG6TElJKZ5Ph5QuTRe_mXY6AotKYPP3rZCB_9SwU-111iNrsWxQQJrC7NInp70u";

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(setRooms);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleAddRoom = async () => {
    if (!roomNo || !roomCapacity) {
      alert("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("accessToken"); // Retrieve token

    if (!token) {
      alert("Unauthorized: No token found. Please log in.");
      return;
    }

    const newRoom = {
      room: roomNo,
      capacity: roomCapacity,
      status: roomStatus,
    };

    try {
      const response = await axios.post(API_URL, newRoom, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      });

      setRooms([...rooms, response.data]);
      clearForm();
    } catch (error) {
      console.error("Error adding room:", error.response?.data || error);
    }
  };

  const clearForm = () => {
    setRoomNo("");
    setRoomCapacity("");
    setRoomStatus(false);
  };

  const handleDelete = async (id) => {
    // const token = localStorage.getItem("accessToken"); // Retrieve token
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJlbWFpbCI6InJpcHVuamF5QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzQxNTg2NDE1LCJleHAiOjE3NDE2NzI4MTV9.iUG6TElJKZ5Ph5QuTRe_mXY6AotKYPP3rZCB_9SwU-111iNrsWxQQJrC7NInp70u";

    if (!token) {
      alert("Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      });

      setRooms(rooms.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Error deleting room:", error.response?.data || error);
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      (room.name &&
        room.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (room.capacity && room.capacity.toString().includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Enter Room Details
          </h2>
          <input
            type="text"
            placeholder="Room No"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="number"
            placeholder="Room Capacity"
            value={roomCapacity}
            onChange={(e) => setRoomCapacity(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Room Status (Active):</label>
            <input
              type="checkbox"
              checked={roomStatus}
              onChange={(e) => setRoomStatus(e.target.checked)}
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
              onClick={handleAddRoom}
              className="bg-[#1976d2] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-[#1976d2]"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
            All Rooms
          </h2>
          <input
            type="text"
            placeholder="Search by Room or Capacity"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className=" bg-blue-50">
                <th className="border p-2">ID</th>
                <th className="border p-2">Room</th>
                <th className="border p-2">Capacity</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room._id} className="even:bg-gray-50">
                    <td className="border p-2 text-center">{room._id}</td>
                    <td className="border p-2 text-center">{room.name}</td>
                    <td className="border p-2 text-center">{room.capacity}</td>
                    <td className="border p-2 text-center">
                      {room.available ? "Active" : "Inactive"}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-2 hover:bg-red-600"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border p-4 text-center">
                    No rooms found.
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

export default RoomManagementApp;
