import { createSlice } from "@reduxjs/toolkit";

function getLocalStorageData() {
  let profile = localStorage.getItem("profile");

  if (profile) {
    return JSON.parse(localStorage.getItem("profile"));
  }

  return null;
}

const initialState = {
  userDetails: getLocalStorageData(),
};

const authSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem("profile", JSON.stringify(action.payload.result));
      action.payload.navigate("/");
      state.userDetails = action.payload.result;
    },
    logout: (state, action) => {
      localStorage.clear();
      sessionStorage.clear();
      state.userDetails = null;
    },
  },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
