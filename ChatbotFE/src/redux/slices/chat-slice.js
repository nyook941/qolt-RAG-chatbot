import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isRecording: false,
  isRecordingSendPending: false,
  isMicBlocked: false,
  audioBlobUrl: "",
  isAudioLoading: false,
  isResponseLoading: false,
  transcribeWebsocket: "",
  isTranscribeLoading: false,
  messages: [],
  view: "chat",
  uploadedFiles: [],
};

export const fetchUploadedFiles = createAsyncThunk(
  "chat/fetchUploadedFiles",
  async () => {
    const url =
      "https://k5jhm1siei.execute-api.us-east-2.amazonaws.com/default/documents";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const files = await response.json();
      return files;
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setIsRecordingSendPending: (state, action) => {
      state.isRecordingSendPending = action.payload;
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
    setTranscribeWebsocket: (state, action) => {
      state.transcribeWebsocket = action.payload;
    },
    setIsTranscribeLoading: (state, action) => {
      state.isTranscribeLoading = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setFile: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    addFile: (state, action) => {
      state.uploadedFiles.files.push(action.payload);
    },
    removeFile: (state, action) => {
      state.uploadedFiles.files = state.uploadedFiles.files.filter(
        (file) => file !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadedFiles.pending, (state) => {
        // Handle loading state
      })
      .addCase(fetchUploadedFiles.fulfilled, (state, action) => {
        state.uploadedFiles = action.payload;
      })
      .addCase(fetchUploadedFiles.rejected, (state) => {
        // Handle error state
      });
  },
});

export const {
  setIsRecording,
  setIsMicBlocked,
  setAudioBlobUrl,
  addMessage,
  setIsResponseLoading,
  setTranscribeWebsocket,
  setIsTranscribeLoading,
  setView,
  setFile,
  addFile,
  removeFile,
  setIsRecordingSendPending
} = chatSlice.actions;

export default chatSlice.reducer;
