// import React, { useEffect, useState } from "react";
// import { fetchSections, addSection } from "../../redux/subjectsSlice";
// import { useSelector, useDispatch, Provider } from "react-redux";
// import { Card, CardContent, Button } from "@mui/material";
// import store from "../../redux/store"; // Ensure correct path to your store

// const SemesterSections = () => {
//   const dispatch = useDispatch();
//   const sections = useSelector((state) => state.sections?.data) || [
//     { sectionTitle: "A1", semester: "2017-2021 BS-CS 7th Semester" },
//     { sectionTitle: "B2", semester: "2020-2024 BS-CS 1st Semester" },
//   ];
//   const [sectionTitle, setSectionTitle] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [capacity, setCapacity] = useState("");

//   useEffect(() => {
//     dispatch(fetchSections());
//   }, [dispatch]);

//   const handleSubmit = () => {
//     if (sectionTitle && selectedSemester && capacity) {
//       dispatch(addSection({ sectionTitle, selectedSemester, capacity }));
//       setSectionTitle("");
//       setSelectedSemester("");
//       setCapacity("");
//     }
//   };

//   return (
//     <div className="p-4 grid grid-cols-2 gap-4">
//       <Card className="p-4 bg-green-500 text-white">
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2">
//             Semester Section Registration
//           </h2>
//           <input
//             type="text"
//             placeholder="Section Title"
//             value={sectionTitle}
//             onChange={(e) => setSectionTitle(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <select
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           >
//             <option value="">Select Semester</option>
//             <option value="2017-2021 BS-CS 7th Semester">
//               2017-2021 BS-CS 7th Semester
//             </option>
//             <option value="2020-2024 BS-CS 1st Semester">
//               2020-2024 BS-CS 1st Semester
//             </option>
//           </select>
//           <input
//             type="number"
//             placeholder="Enter Capacity"
//             value={capacity}
//             onChange={(e) => setCapacity(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <div className="flex space-x-2">
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => {
//                 setSectionTitle("");
//                 setSelectedSemester("");
//                 setCapacity("");
//               }}
//             >
//               Clear
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Save
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//       <Card className="p-4 bg-green-500 text-white">
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2">Search</h2>
//           <table className="w-full border border-white">
//             <thead>
//               <tr>
//                 <th className="border border-white p-2">Section</th>
//                 <th className="border border-white p-2">Semester</th>
//                 <th className="border border-white p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sections.map((section, index) => (
//                 <tr key={index}>
//                   <td className="border border-white p-2">
//                     {section.sectionTitle}
//                   </td>
//                   <td className="border border-white p-2">
//                     {section.semester}
//                   </td>
//                   <td className="border border-white p-2">
//                     <input type="checkbox" checked readOnly />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const WrappedSemesterSections = () => (
//   <Provider store={store}>
//     <SemesterSections />
//   </Provider>
// );

// export default WrappedSemesterSections;

import React, { useEffect, useState } from "react";
import { fetchSections, addSection } from "../../redux/subjectsSlice";
import { useSelector, useDispatch, Provider } from "react-redux";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import store from "../../redux/store"; // Ensure correct path to your store

const SemesterSections = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections?.data) || [
    { sectionTitle: "A1", semester: "2017-2021 BS-CS 7th Semester" },
    { sectionTitle: "B2", semester: "2020-2024 BS-CS 1st Semester" },
  ];
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleSubmit = () => {
    if (sectionTitle && selectedSemester && capacity) {
      dispatch(addSection({ sectionTitle, selectedSemester, capacity }));
      setSectionTitle("");
      setSelectedSemester("");
      setCapacity("");
    }
  };

  return (
    <Box className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card elevation={3} sx={{ backgroundColor: "#f5f5f5", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Semester Section Registration
          </Typography>
          <TextField
            fullWidth
            label="Section Title"
            variant="outlined"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Semester</InputLabel>
            <Select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <MenuItem value="">Select Semester</MenuItem>
              <MenuItem value="2017-2021 BS-CS 7th Semester">
                2017-2021 BS-CS 7th Semester
              </MenuItem>
              <MenuItem value="2020-2024 BS-CS 1st Semester">
                2020-2024 BS-CS 1st Semester
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Enter Capacity"
            type="number"
            variant="outlined"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setSectionTitle("");
                setSelectedSemester("");
                setCapacity("");
              }}
            >
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card elevation={3} sx={{ backgroundColor: "#f5f5f5", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Search
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Section</b>
                  </TableCell>
                  <TableCell>
                    <b>Semester</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section, index) => (
                  <TableRow key={index}>
                    <TableCell>{section.sectionTitle}</TableCell>
                    <TableCell>{section.semester}</TableCell>
                    <TableCell>
                      <input type="checkbox" checked readOnly />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

const WrappedSemesterSections = () => (
  <Provider store={store}>
    <SemesterSections />
  </Provider>
);

export default WrappedSemesterSections;
