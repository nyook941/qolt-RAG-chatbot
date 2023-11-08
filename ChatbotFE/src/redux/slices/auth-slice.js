import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signUpEmail: "",
  signUpPass: "",
  signUpConfirmPass: "",
  loginEmail: "",
  loginPass: "",
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        "https://p7lflzf637.execute-api.us-east-2.amazonaws.com/prod/getUsers"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }
);

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
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    setLoginPass: (state, action) => {
      state.loginPass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users = null;
      });
  },
});

export const {
  setSignUpConfirmPass,
  setSignUpEmail,
  setSignUpPass,
  setUsers,
  setLoginEmail,
  setLoginPass,
} = authSlice.actions;

export default authSlice.reducer;
