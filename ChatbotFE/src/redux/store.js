import { configureStore } from "@reduxjs/toolkit";
import chat from "./slices/chat-slice";

export const store = configureStore({
  reducer: {
    chat,
  },
});
