
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TimeTable from "../TimeTable"; // Import the TimeTable component
import api, { setAuthToken } from "../Store/apiClient"; // Import API client
import TimeTable2 from "../TimeTable2";

const pages = [
  "Home",
  "Management",
  "NIELIT Centers",
  "Student Zone",
  "Recruitment",
  "Time-Table",
  "About Us",
  "New Time Table"
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showNewTimeTable, setShowNewTimeTable] = useState(false); 
  const navigate = useNavigate(); // Hook for navigation

  // Check if user is logged in
  const token = localStorage.getItem("jwt");
  const isAuthenticated = !!token;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Logout function
  const handleLogout = () => {
    setAuthToken(null); // Remove token from API headers
    navigate("/login"); // Redirect to login page
  };

  // Page navigation handler
  const handlePageClick = (page) => {
    switch (page) {
      case "Home":
        alert("Navigating to Home");
        break;
      case "Management":
        alert("Navigating to Management");
        break;
      case "Time-Table":
        setShowTimeTable((prev) => !prev); // toggle visibility
        setShowNewTimeTable(false); // close other components
        break;
      case "New Time Table":
        setShowNewTimeTable((prev) => !prev); // toggle visibility
        setShowTimeTable(false); // close other components
        break;
      default:
        alert(`Navigating to ${page}`);
        setShowTimeTable(false);
        setShowNewTimeTable(false);
    }
  };
  

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{ color: "white" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Auth Buttons */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                // Show avatar and logout when user is logged in
                <Tooltip title="User Menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                // Show Register & Login buttons when not logged in
                <>
                  <Button color="inherit" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </>
              )}

              {/* User Menu Dropdown */}
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showTimeTable && <TimeTable />} {/* Show TimeTable if selected */}
      {showNewTimeTable && <TimeTable2/>} {/* Show New TimeTable if selected */}
    </>
  );
}

export default ResponsiveAppBar;
