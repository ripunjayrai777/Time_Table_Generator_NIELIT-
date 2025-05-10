import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // Importing the custom axios instance
import { toast } from "react-toastify";

// Fetch all rooms
export const fetchRooms = createAsyncThunk("room/allRooms", async () => {
  const response = await api.get("/room/allRooms"); // Assuming '/rooms' is the endpoint to get rooms
  // console.log("/Fetched Rooms:", response.data); // Log the fetched rooms
  return response.data; // Returns the list of rooms from the API
});

// Add a new room
export const addRoom = createAsyncThunk("room/addRoom", async (roomData) => {
  const newRoom = {
    roomId: roomData.room,         // Assuming room number is used as ID, or it can be auto-generated in the backend
    name: roomData.room,
    capacity: parseInt(roomData.capacity, 10), // Ensure capacity is an integer
    available: roomData.status,
  };

  const response = await api.post("/room/addRoom", newRoom); // POST request to create a new room
  toast.success("Room added successfully!"); // Show success message
  console.log("New Room:", response.data); // Log the newly created room
  return response.data; // Returns the newly created room from the API
  
});

// Delete a room
export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (roomId) => {
  await api.delete(`/rooms/${roomId}`); // DELETE request to remove the room by its roomId
  return roomId; // Returns the roomId to update the store after deletion
});

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of fetching rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the successful response of fetching rooms
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload; // Store fetched rooms in the state
        state.error = null; // Clear any previous error
      })
      // Handle the error when fetching rooms fails
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle the successful response of adding a new room
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload); // Add the newly created room to the state
      })

      // Handle the successful response of deleting a room
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.roomId !== action.payload); // Remove the deleted room from the state
      });
  },
});

export default roomSlice.reducer;
