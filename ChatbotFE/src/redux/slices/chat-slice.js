import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isRecording: false,
  isMicBlocked: false,
  audioBlobUrl: "",
  isAudioLoading: false,
  isResponseLoading: false,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setIsMicBlocked: (state, action) => {
      state.isMicBlocked = action.payload;
    },
    setAudioBlobUrl: (state, action) => {
      state.audioBlobUrl = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setIsResponseLoading: (state, action) => {
      state.isResponseLoading = action.payload;
    },
  },
});

export const {
  setIsRecording,
  setIsMicBlocked,
  setAudioBlobUrl,
  addMessage,
  setIsResponseLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
