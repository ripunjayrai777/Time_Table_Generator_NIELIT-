// // Redux Slice (redux/subjectsSlice.js)
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchSubjects = createAsyncThunk(
//   "subjects/fetchSubjects",
//   async () => {
//     const response = await fetch("/api/subjects"); // Replace with actual API endpoint
//     return response.json();
//   }
// );

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
