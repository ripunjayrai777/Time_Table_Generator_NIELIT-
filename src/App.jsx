import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lessons from "./components/Lessons/index";
import DayTimeSlot from "./components/DayTimeSlot";
import GenerateTable from "./components/GenerateTable/index";
import Room from "./components/Rooms";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TimeTable from "./components/TimeTable2";
import Print from "./components/Print";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container w-full">
          <div className="container w-full">
            <Header />
          </div>

          <div>
            <Navbar />
          </div>

          <Routes>
            <Route path="/" element={<TimeTable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/days" element={<DayTimeSlot />} />
            <Route path="/generate-table" element={<GenerateTable />} />
            <Route path="/print" element={<Print />} />
            <Route path="/time-table" element={<TimeTable />} />
            <Route path="/room" element={<Room />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
