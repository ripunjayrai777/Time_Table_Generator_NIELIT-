import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api, { setAuthToken } from "../components/Store/apiClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post(
        "https://timetable-generator-latest.onrender.com/api/auth/login",
        { email, password }
      );
      const { token } = response.data;

      setAuthToken(token); // Store token in localStorage and API headers
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/register")}>Register</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
