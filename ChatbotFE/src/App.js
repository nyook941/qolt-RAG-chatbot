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
  setAttemptingLogin,
  setLoggedIn,
  setLoginError,
} from "./redux/slices/auth-slice";
import Chatbot from "./components/chatbot/chatbot";
import {
  setIsTranscribeLoading,
  setTranscribeWebsocket,
} from "./redux/slices/chat-slice";

export default function App() {
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const wsInstance = new Sockette(
      "wss://ehj9s7fnwb.execute-api.us-east-2.amazonaws.com/production",
      {
        onmessage: (e) => {
          try {
            const message = JSON.parse(e.data);
            switch (message.action) {
              case "loginUser":
                handleUserLogin(message);
                break;
              case "createUser":
                handleCreateUser(message);
                break;
              case "transcription":
                handleTranscription(message);
              default:
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

  const handleUserLogin = (message) => {
    dispatch(setAttemptingLogin(false));
    if (message.statusCode === 200) {
      dispatch(setLoggedIn(true));
      dispatch(setLoginError(false));
    } else if (message.statusCode === 403) {
      dispatch(setLoggedIn(false));
      dispatch(setLoginError(true));
    }
  };

  const handleCreateUser = (message) => {
    dispatch(setAttemptingLogin(false));
    if (message.statusCode === 200) {
      dispatch(setLoggedIn(true));
      dispatch(setLoginError(false));
    }
  };

  const handleTranscription = (message) => {
    dispatch(setTranscribeWebsocket(message.body.message));
    dispatch(setIsTranscribeLoading(false));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Chatbot ws={ws}/>} />
          <Route path="/signup" element={<SignUp ws={ws} />} />
          <Route path="/login" element={<Login ws={ws} />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/chatbot" element={<Chatbot ws={ws} />} />
        </Routes>
      </div>
    </Router>
  );
}
