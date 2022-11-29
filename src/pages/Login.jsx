import React, { useEffect } from "react";
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

function Login() {
  const clientId =
    "138859867369-g3nr6uao83abs4idah5lvpm1uv6jkj13.apps.googleusercontent.com";

  const dispatch = useDispatch();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const navigate = useNavigate();

  async function googleSuccess(resp) {
    const result = resp?.profileObj;
    const token = resp?.tokenId;

    try {
      dispatch(signIn({ result, token, navigate }));
    } catch (error) {
      console.log(error);
    }
  }

  function googleFailure(error) {
    console.log("error", error);
  }

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
            Login
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
              id="password"
              name="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
        <Box display={"flex"} flexDirection={"column"}>
          <GoogleLogin
            clientId="138859867369-g3nr6uao83abs4idah5lvpm1uv6jkj13.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} padding={3}>
          <Link to="/sign-up">
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
