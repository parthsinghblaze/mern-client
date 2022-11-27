import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./feature/posts/postSlice"
import authReducer from "./feature/auth/authSlice"

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
});