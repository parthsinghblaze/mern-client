import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../feature/auth/authSlice";
import { GoogleLogout } from "react-google-login";

const theme = createTheme();

function Header() {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="relative"
        display={"flex"}
        style={{ background: "none" }}
      >
        <Toolbar>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Typography
              style={{ cursor: "pointer" }}
              variant="h6"
              color="primary"
              noWrap
              onClick={() => navigate("/")}
            >
              Memories
            </Typography>
            <Box display={"flex"} gap={3}>
              <Typography color="black">
                {userDetails?.givenName && `Welcome: ${userDetails?.givenName}`}
              </Typography>
              {userDetails === null && (
                <Button
                  size="small"
                  color="success"
                  variant={"contained"}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
              {userDetails !== null && (
                <Button
                  size="small"
                  color="success"
                  variant={"contained"}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
              <Button
                size="small"
                color="error"
                variant={"contained"}
                onClick={() => navigate("/create-post")}
              >
                Create Post
              </Button>
              x
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
