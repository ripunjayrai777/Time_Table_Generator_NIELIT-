import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api from "../components/Store/apiClient";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(
        "https://timetable-generator-latest.onrender.com/api/auth/register",
        { username, email, password }
      );
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
