import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { loginUser, clearError } from "../redux/Auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [token, navigate, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, navigate }));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/register")} disabled={loading}>
            Register
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
