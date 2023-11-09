import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signUpEmail: "",
  signUpPass: "",
  signUpConfirmPass: "",
  loginEmail: "",
  loginPass: "",
  email: "",
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpEmail: (state, action) => {
      state.signUpEmail = action.payload;
    },
    setSignUpPass: (state, action) => {
      state.signUpPass = action.payload;
    },
    setSignUpConfirmPass: (state, action) => {
      state.signUpConfirmPass = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    setLoginPass: (state, action) => {
      state.loginPass = action.payload;
    },
  },
});

export const {
  setSignUpConfirmPass,
  setSignUpEmail,
  setSignUpPass,
  setLoginEmail,
  setLoginPass,
} = authSlice.actions;

export default authSlice.reducer;
