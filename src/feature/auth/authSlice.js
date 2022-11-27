import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails: ""
};

const authSlice = createSlice({
    name: "posts",
    initialState
});

export default authSlice.reducer