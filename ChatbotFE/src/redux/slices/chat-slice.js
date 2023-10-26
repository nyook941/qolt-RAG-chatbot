import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  responses: [],
  isRecording: false,
  isMicBlocked: false,
  audioBlobUrl: "",
  isAudioLoading: false,
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
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setIsMicBlocked: (state, action) => {
      state.isMicBlocked = action.payload;
    },
    setAudioBlobUrl: (state, action) => {
      state.audioBlobUrl = action.payload;
    },
  },
});

export const {
  addResponse,
  addRequest,
  setIsRecording,
  setIsMicBlocked,
  setAudioBlobUrl,
} = chatSlice.actions;

export default chatSlice.reducer;
