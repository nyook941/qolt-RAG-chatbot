import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Sockette from "sockette";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import MainBody from "./components/main-body/main-body";
import AppFooter from "./components/app-footer/app-footer";
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
    <div className="App">
      <AppHeader />
      <MainBody />
      <AppFooter ws={ws} />
    </div>
  );
}
