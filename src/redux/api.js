import axios from "axios";
import { store } from "./store";
import { logout, setAccessToken } from "./Auth/authSlice";

export const API_BASE_URL =
  "https://timetable-generator-latest.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor – Attach access token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor – Handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
