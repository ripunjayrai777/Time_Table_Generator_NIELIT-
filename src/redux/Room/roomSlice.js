import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { toast } from "react-toastify";

// Async thunk for fetching rooms
export const fetchRooms = createAsyncThunk(
  "rooms/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/room/allRooms");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch rooms";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for adding a room
export const addRoom = createAsyncThunk(
  "rooms/add",
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await api.post("/room/add", roomData);
      toast.success("Room added successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add room";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a room
export const deleteRoom = createAsyncThunk(
  "rooms/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/room/${id}`);
      toast.success("Room deleted successfully!");
      return id;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete room";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch rooms cases
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        state.error = null;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add room cases
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
        state.error = null;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete room cases
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(room => room._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = roomSlice.actions;
export default roomSlice.reducer;