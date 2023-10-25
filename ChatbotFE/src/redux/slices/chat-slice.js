import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  responses: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addResponse: (state, action) => {
      state.responses.push(action.payload);
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
  },
});

export const { addResponse, addRequest } = chatSlice.actions;

export default chatSlice.reducer;
