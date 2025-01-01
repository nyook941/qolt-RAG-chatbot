import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  signUpEmail: "",
  signUpPass: "",
  signUpConfirmPass: "",
  loginEmail: "",
  loginPass: "",
  email: "",
  password: "",
  loggedIn: false,
  attemptingLogin: false,
  loginError: false,
  users: [],
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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setAttemptingLogin: (state, action) => {
      state.attemptingLogin = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setUsers: (state, action) => {
      state.loginError = action.payload;
    },
  },
});

export const {
  setSignUpConfirmPass,
  setSignUpEmail,
  setSignUpPass,
  setLoginEmail,
  setLoginPass,
  setLoggedIn,
  setAttemptingLogin,
  setLoginError,
  setUsers,
} = authSlice.actions;

export default authSlice.reducer;
