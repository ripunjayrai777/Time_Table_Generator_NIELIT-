// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Program from "./components/Program";
import Lessons from "./components/Lessons";
import Session from "./components/Session";
import Subjects from "./components/Subjects";
import Lecturers from "./components/Lecturers";
import RoomsLabs from "./components/RoomLabs";
import Rooms from "./components/Rooms";
import Labs from "./components/Labs";
import Semesters from "./components/Semesters";
import AddSemester from "./components/AddSemesterSection";
import SubjectSemester from "./components/AddSubjectToSemester";
import SemesterProgram from "./components/AssignSemesterToProgram";
import NewSemester from "./components/NewSemester";
import Days from "./components/Days";
import DayTimeSlot from "./components/DayTimeSlot";
import TimeTable from "./components/TimeTable";
import Print from "./components/Print";

import Navbar from "./components/Navbar";
import GenerateTable from "./components/GenerateTable";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="container w-full">
        <div className="container w-full">
          <Header />
        </div>

        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/program" element={<Program />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/session" element={<Session />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/lecturers" element={<Lecturers />} />
          <Route path="/rooms-labs" element={<RoomsLabs />} />
          <Route path="/rooms-labs/add-rooms" element={<Rooms />} />
          <Route path="/rooms-labs/add-labs" element={<Labs />} />
          <Route path="/semesters" element={<Semesters />} />
          <Route path="/semesters/new-semester" element={<NewSemester />} />
          <Route
            path="/semesters/add-semester-sections"
            element={<AddSemester />}
          />
          <Route
            path="/semesters/add-subject-to-semester"
            element={<SubjectSemester />}
          />
          <Route
            path="/semesters/assign-semester-to-program"
            element={<SemesterProgram />}
          />
          <Route path="/days/selection" element={<Days />} />
          <Route path="/days/slot" element={<DayTimeSlot />} />
          <Route path="/generate-table" element={<GenerateTable />} />
          <Route path="/print" element={<Print />} />
          <Route path="/time-table" element={<TimeTable />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
