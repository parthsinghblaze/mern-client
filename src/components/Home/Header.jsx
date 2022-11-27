import React from "react"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

const theme = createTheme();

function Header() {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative" display={"flex"} style={{ background: "none" }}>
                <Toolbar>
                    <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Typography style={{ cursor: "pointer" }} variant="h6" color="primary" noWrap onClick={() => navigate("/")}>
                        Memories
                    </Typography>
                        <Button size="small" color="error" variant={"contained"} onClick={() => navigate("/create-post")}>Create Post</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header