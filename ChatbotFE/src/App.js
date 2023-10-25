import React, { useState, useEffect } from "react";
import Sockette from "sockette";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import MainBody from "./components/main-body/main-body";
import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const [ws, setWs] = useState(null);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (ws) {
      const payload = {
        action: "startTranscription",
        message: "test.mp3",
      };
      ws.json(payload);
      console.log("Sent:", payload);
    }
  };

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

  const onChange = (e) => {
    const textArea = e.target;
    setText(e.target.value);
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="Main-body">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div className="Input-container">
        <div className="Input-field">
          <textarea
            type="text"
            placeholder="Ask anything about QoLT..."
            value={text}
            onChange={onChange}
          />
          <i className="material-icons input-icon" />
        </div>
      </div>
    </div>
  );
}
