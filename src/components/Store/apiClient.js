import axios from "axios";

export const API_BASE_URL = "https://timetable-generator-43z2.onrender.com/api"; // Change this to match your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("jwt", token); // Store token in localStorage
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt"); // Remove token if not provided
  }
};

// Load token from localStorage when app starts
const jwt = localStorage.getItem("jwt");
if (jwt) {
  setAuthToken(jwt);
}

export default api;
