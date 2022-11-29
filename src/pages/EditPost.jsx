import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  createPost,
  updatePost,
} from "../feature/posts/postSlice";
import { useLocation, useNavigate, useParams } from "react-router";
const theme = createTheme();

const validationSchema = yup.object({
  creator: yup.string("Enter your creator").required("creator is required"),
  title: yup.string("Enter your password").required("Title is required"),
  message: yup.string("Enter your message").required("Message is required"),
  tags: yup.string("Enter your tags").required("Tag is required"),
});

function EditPost() {
  const { isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: formValues } = useLocation();
  const params = useParams();

  const formik = useFormik({
    initialValues: { ...formValues, tags: formValues.tags.toString() },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formValue = {
        ...values,
        tags: values.tags.split(","),
      };

      dispatch(updatePost({ formValue, resetForm, id: params.id, navigate }));
    },
  });

  const { setFieldValue, resetForm } = formik;

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
            Edit Post
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            style={{ width: "100%", padding: "30px 0" }}
          >
            <Box marginBottom={3} fullWidth>
              <TextField
                fullWidth
                id="creator"
                name="creator"
                label="Creator"
                value={formik.values.creator}
                onChange={formik.handleChange}
                error={formik.touched.creator && Boolean(formik.errors.creator)}
                helperText={formik.touched.creator && formik.errors.creator}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="tags"
                name="tags"
                label="Tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
              />
            </Box>
            <Box marginBottom={3}>
              <FileBase
                name="selectedFile"
                onDone={({ base64 }) => setFieldValue("selectedFile", base64)}
              />
            </Box>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {isLoading ? "Posting" : "Submit"}
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditPost;
