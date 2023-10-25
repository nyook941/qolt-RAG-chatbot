import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  responses: [],
  ws: null,
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
    setWs: (state, action) => {
      state.ws = action.payload;
    },
  },
});

export const { addResponse, addRequest, setWs } = chatSlice.actions;

export default chatSlice.reducer;
