import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";
import { fetchRooms, addRoom, deleteRoom } from "../../redux/Room/roomSlice";

const RoomManagementApp = () => {
  const dispatch = useDispatch();
  const { rooms , loading, error } = useSelector((state) => state.room || {});
  
  console.log("Rooms:"); // Log the rooms fetched from the store
  
  const [roomNo, setRoomNo] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleAddRoom = async () => {
    if (!roomNo || !roomCapacity) {
      alert("Please fill all fields.");
      return;
    }

    const newRoom = {
      room: roomNo,
      capacity: roomCapacity,
      status: roomStatus,
    };

    dispatch(addRoom(newRoom));
    clearForm();
  };

  const clearForm = () => {
    setRoomNo("");
    setRoomCapacity("");
    setRoomStatus(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  };
  
  const filteredRooms = Array.isArray(rooms) ? rooms.filter((room) => {
    const roomIdStr = room.roomId?.toLowerCase() || "";
    const roomNameStr = room.name?.toLowerCase() || "";
    const capacityStr = room.capacity?.toString() || "";
    const searchLower = searchQuery.toLowerCase();

    return (
      roomIdStr.includes(searchLower) ||
      roomNameStr.includes(searchLower) ||
      capacityStr.includes(searchLower)
    );
  }) : [];

  
  if (loading) {
    return <div className="min-h-screen bg-blue-50 p-10">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-blue-50 p-10">Error: {error}</div>;
  }

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
            placeholder="Search by Room ID, Name or Capacity"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className=" bg-blue-50">
                <th className="border p-2">Room ID</th>
                <th className="border p-2">Room Name</th>
                <th className="border p-2">Capacity</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.roomId} className="even:bg-gray-50">
                    <td className="border p-2 text-center">{room.roomId}</td>
                    <td className="border p-2 text-center">{room.name}</td>
                    <td className="border p-2 text-center">{room.capacity}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(room.roomId)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-2 hover:bg-red-600"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border p-4 text-center">
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
