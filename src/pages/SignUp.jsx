import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { signIn } from "../feature/auth/authSlice";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

const theme = createTheme();

const validationSchema = yup.object({
  email: yup.string("Enter your Email").required("email is required"),
  password: yup.string("Enter your password").required("password is required"),
});

function SignUp() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ width: "100%", padding: "30px 0" }}
        >
          <Box marginBottom={3}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              fullWidth
              id="cpassword"
              name="cpassword"
              label="Confirm Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.cpassword && Boolean(formik.errors.cpassword)
              }
              helperText={formik.touched.cpassword && formik.errors.cpassword}
            />
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Sign up
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
