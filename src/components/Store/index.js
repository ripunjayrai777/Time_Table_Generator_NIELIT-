// src/store.js
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Initial data for demo purposes (could be fetched from APIs)
const initialState = {
  sessions: [],
  programs: [],
  semesters: [],
  loading: false,
};

// Mock API fetch functions
const fetchData = (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        sessions: ["2016-2020", "2020-2024", "2022-2026"],
        programs: ["PhD-CS", "BS-IT", "MS-SE"],
        semesters: [
          "1st Semester",
          "2nd Semester",
          "3rd Semester",
          "4th Semester",
          "5th Semester",
          "6th Semester",
          "7th Semester",
          "8th Semester",
        ],
      };
      resolve(data[endpoint]);
    }, 500);
  });
};

// Async thunks
export const fetchActiveSessions = createAsyncThunk(
  "program/fetchSessions",
  async () => await fetchData("sessions")
);
export const fetchActivePrograms = createAsyncThunk(
  "program/fetchPrograms",
  async () => await fetchData("programs")
);
export const fetchActiveSemesters = createAsyncThunk(
  "program/fetchSemesters",
  async () => await fetchData("semesters")
);

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchActivePrograms.fulfilled, (state, action) => {
        state.programs = action.payload;
      })
      .addCase(fetchActiveSemesters.fulfilled, (state, action) => {
        state.semesters = action.payload;
      });
  },
});

const store = configureStore({
  reducer: {
    program: programSlice.reducer,
  },
});

export default store;
