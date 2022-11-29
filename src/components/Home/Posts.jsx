import React, { useEffect } from "react";
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
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  fetchAllPosts,
  deletePost,
  likePost,
} from "../../feature/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (posts.length === 0) {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Please add Memories
        </Typography>
      </Box>
    );
  }

  return (
    <Masonry columns={3} spacing={4} padding={5}>
      {posts &&
        posts.map((item, index) => {
          const {
            title,
            creator,
            selectedFile,
            message,
            likeCount,
            _id,
            tags,
          } = item;
          return (
            <div key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <img
                    src={selectedFile}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography gutterBottom variant="h6" component="h6">
                    {tags.map((tagsName, index) => {
                      return <span key={index}>#{tagsName} </span>;
                    })}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title} , {creator}
                  </Typography>
                  <Typography>{message}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => dispatch(deletePost(_id))}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/edit-post/${_id}`, { state: { ...item } })
                    }
                  >
                    Edit
                  </Button>
                  <Button size="small" onClick={() => dispatch(likePost(_id))}>
                    Like {likeCount}{" "}
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </Masonry>
  );
}

export default Posts;
