import { configureStore } from "@reduxjs/toolkit";
import chat from "./slices/chat-slice";
import auth from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    chat,
    auth,
  },
});
