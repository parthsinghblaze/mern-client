import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utilites/axios";

const initialState = {
  isLoading: false,
  posts: [],
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ formValue, resetForm }, thunkAPI) => {
    try {
      const resp = await axios.post("/posts", formValue);
      if (resp.status === 200) {
        resetForm();
        return resp.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ formValue, resetForm, id, navigate }, thunkAPI) => {
    try {
      const resp = await axios.patch(`/posts/${id}`, formValue);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(`/posts/${id}`);
      thunkAPI.dispatch(getAllPosts());
    } catch (e) {
      console.log(e);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    getAllPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updatePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading, getAllPosts } = postSlice.actions;

export default postSlice.reducer;

export const fetchAllPosts = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    try {
      const resp = await axios.get("/posts");
      dispatch(getAllPosts(resp.data));
      dispatch(stopLoading());
    } catch (e) {
      console.log(e);
    }
  };
};

export const likePost = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    try {
      const resp = await axios.patch(`/posts/${id}/likePost`);
      if (resp.status === 200) {
        dispatch(fetchAllPosts());
        dispatch(stopLoading());
      }
    } catch (e) {
      console.log(e);
    }
  };
};
