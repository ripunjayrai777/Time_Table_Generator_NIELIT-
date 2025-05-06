import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { toast } from "react-toastify";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("jwt", response.data.token);

      // Show success toast only if we have a message
      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate("/");
      return response.data;
    } catch (err) {
      // Show error toast
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Show success toast
      if (response.data.message) {
        toast.success(response.data.message);
      }

      // Navigate to login page after successful registration
      navigate("/login");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("jwt"),
    // refreshToken: localStorage.getItem("refreshToken"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
    },
    clearError: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("jwt", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, clearError, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
