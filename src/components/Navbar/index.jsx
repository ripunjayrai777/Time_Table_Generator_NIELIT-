import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";
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

import TimeTable2 from "../TimeTable2";

const pages = [
  "Home",
  "Management",
  "NIELIT Centers",
  "Student Zone",
  "Recruitment",
  "Time-Table",
  "About Us",
  "New Time Table",
];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showNewTimeTable, setShowNewTimeTable] = useState(false);

  const isAuthenticated = !!accessToken;

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    handleCloseUserMenu();
  };

  const handlePageClick = (page) => {
    handleCloseNavMenu();
    
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Management":
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
        navigate("/management");
        break;
      case "Time-Table":
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
        setShowTimeTable((prev) => !prev);
        setShowNewTimeTable(false);
        break;
      case "New Time Table":
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
        setShowNewTimeTable((prev) => !prev);
        setShowTimeTable(false);
        break;
      default:
        navigate(`/${page.toLowerCase().replace(" ", "-")}`);
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
                  sx={{ color: "white", my: 2 }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Auth Section */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.name || "User"} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/register")}
                    sx={{ ml: 1 }}
                  >
                    Register
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/login")}
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {showTimeTable && <TimeTable />}
      {showNewTimeTable && <TimeTable2 />}
    </>
  );
}

export default ResponsiveAppBar;
