import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "../../utilites/axios";

const initialState = {
    isLoading: false,
    posts: []
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (name, thunkAPI) => {
    try {
        const resp = await axios.get("/posts");
        return resp.data
    } catch (e) {
        console.log(e)
    }
});

export const createPost = createAsyncThunk("posts/createPost" , async ({values, resetForm}, thunkAPI) => {
    try {
        const resp = await axios.post("/posts", values);
        if(resp.status === 200) {
            resetForm();
            return resp.data
        }
    } catch (e) {
        console.log(e)

    }
});

export const updatePost = createAsyncThunk("posts/updatePost" , async({values, resetForm, id, navigate}, thunkAPI) => {
    try {
        const resp = await axios.patch(`/posts/${id}`, values);
        navigate('/');
    } catch (e) {
        console.log(e)
    }
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        }
    },
    extraReducers: {
        [getAllPosts.pending] : (state) => {
            state.isLoading = true
        },
        [getAllPosts.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.posts = action.payload
        },
        [createPost.pending] : (state, action) => {
            state.isLoading = true;
        },
        [createPost.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [updatePost.pending] : (state, action) => {
            state.isLoading = true;
        },
        [updatePost.fulfilled] : (state, action) => {
            state.isLoading = false;
        }
    }
});

export default postSlice.reducer