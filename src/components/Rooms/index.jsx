import React, { useState } from "react";
import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";

const RoomManagementApp = () => {
  const [rooms, setRooms] = useState([]);
  const [roomNo, setRoomNo] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddRoom = () => {
    if (roomNo && roomCapacity) {
      setRooms([
        ...rooms,
        {
          id: rooms.length + 1,
          room: roomNo,
          capacity: roomCapacity,
          status: roomStatus,
        },
      ]);
      clearForm();
    } else {
      alert("Please fill all fields.");
    }
  };

  const clearForm = () => {
    setRoomNo("");
    setRoomCapacity("");
    setRoomStatus(false);
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const toggleStatus = (id) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, status: !room.status } : room
      )
    );
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.capacity.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Enter Room Details Section */}
        <div className="col-span-4 bg-blue-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Enter Room Details
          </h2>
          <input
            type="text"
            placeholder="Room No"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />
          <input
            type="number"
            placeholder="Room Capacity"
            value={roomCapacity}
            onChange={(e) => setRoomCapacity(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
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
              className="bg-[#1976d2] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-[#1976d2] transition-all"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>

        {/* Room List Section */}
        <div className="col-span-8 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
            All Rooms
          </h2>
          <input
            type="text"
            placeholder="Search by Room or Capacity"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
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
                  <tr key={room.id} className="even:bg-gray-50">
                    <td className="border p-2 text-center">{room.id}</td>
                    <td className="border p-2 text-center">{room.room}</td>
                    <td className="border p-2 text-center">{room.capacity}</td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={room.status}
                        onChange={() => toggleStatus(room.id)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(room.id)}
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
