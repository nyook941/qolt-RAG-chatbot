import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/auth/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/sign-up/sign-up";
import Login from "./components/auth/log-in/log-in";
import ForgotPassword from "./components/auth/forgot-password/forgot-password";
import Sockette from "sockette";
import { useDispatch } from "react-redux";
import {
  setIsTranscribeLoading,
  setTranscribeWebsocket,
} from "./redux/slices/chat-slice";
import { fetchUsers } from "./redux/slices/auth-slice";

export default function App() {
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const wsInstance = new Sockette(
      "wss://ehj9s7fnwb.execute-api.us-east-2.amazonaws.com/production",
      {
        onopen: () => {
          console.log("WebSocket connection opened");
          const payload = {
            action: "postId",
          };
          wsInstance.json(payload);
          console.log("Sent:", payload);
        },
        onmessage: (e) => {
          try {
            console.log("Received:", JSON.parse(e.data));
            if (e.data.includes("Transcription Job completed:")) {
              const str = e.data;
              const result = str.replace("Transcription Job completed: ", "");
              dispatch(setTranscribeWebsocket(result));
              dispatch(setIsTranscribeLoading(false));
            }
          } catch (error) {
            console.log("Error parsing message:", e.data, error);
          }
        },
      }
    );

    setWs(wsInstance);

    return () => {
      wsInstance.close();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<SignUp ws={ws} />} />
          <Route path="/login" element={<Login ws={ws} />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}
