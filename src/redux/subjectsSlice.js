// // Redux Slice (redux/subjectsSlice.js)
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; //rr

// // Async Thunks
// export const fetchSubjects = createAsyncThunk(
//   "subjects/fetchSubjects",
//   async () => {
//     const response = await fetch("/api/subjects"); // Replace with actual API endpoint
//     return response.json();
//   }
// );
// export const fetchSections = createAsyncThunk(
//   //rr
//   "sections/fetchSections", //rr
//   async () => {
//     //rr
//     const response = await axios.get("/api/sections"); //rr
//     return response.data; //rr
//   } //rr
// ); //rr
// //rr
// export const addSection = createAsyncThunk(
//   //rr
//   "sections/addSection", //rr
//   async (newSection) => {
//     //rr
//     const response = await axios.post("/api/sections", newSection); //rr
//     return response.data; //rr
//   } //rr
// ); //rr

// //slice
// const subjectsSlice = createSlice({
//   name: "subjects",
//   initialState: { subjects: [], status: "idle" },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSubjects.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSubjects.fulfilled, (state, action) => {
//         state.subjects = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(fetchSubjects.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export default subjectsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await fetch("/api/subjects");
    return response.json();
  }
);

export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async () => {
    const response = await axios.get("/api/sections");
    return response.data;
  }
);

export const addSection = createAsyncThunk(
  "sections/addSection",
  async (newSection) => {
    const response = await axios.post("/api/sections", newSection);
    return response.data;
  }
);

// Slice
const subjectsSlice = createSlice({
  name: "subjects",
  initialState: { subjects: [], sections: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSubjects.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sections = action.payload;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.sections.push(action.payload);
      });
  },
});

export default subjectsSlice.reducer;
