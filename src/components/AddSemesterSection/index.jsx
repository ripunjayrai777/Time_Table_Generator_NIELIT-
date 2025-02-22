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
import store from "../../redux/store";

const SemesterSections = () => {
  const dispatch = useDispatch();
  const sectionsFromStore = useSelector((state) => state.sections?.data) || [];

  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [capacity, setCapacity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    setSections(sectionsFromStore);
  }, [sectionsFromStore]);

  const handleSubmit = () => {
    if (sectionTitle && selectedSemester && capacity) {
      const newSection = {
        sectionTitle,
        semester: selectedSemester,
        capacity,
      };

      dispatch(addSection(newSection));

      // Update the local state immediately
      setSections((prevSections) => [...prevSections, newSection]);

      // Clear the input fields
      setSectionTitle("");
      setSelectedSemester("");
      setCapacity("");
    }
  };

  const filteredSections = sections.filter(
    (section) =>
      section.sectionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Section: Form */}
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

      {/* Right Section: Saved Sections Table */}
      <Card elevation={3} sx={{ backgroundColor: "#f5f5f5", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Saved Sections
          </Typography>
          <TextField
            fullWidth
            label="Search Sections"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
          />
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
                    <b>Capacity</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSections.length > 0 ? (
                  filteredSections.map((section, index) => (
                    <TableRow key={index}>
                      <TableCell>{section.sectionTitle}</TableCell>
                      <TableCell>{section.semester}</TableCell>
                      <TableCell>{section.capacity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No sections available
                    </TableCell>
                  </TableRow>
                )}
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
