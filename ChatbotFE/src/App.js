import React, { useState, useEffect } from "react";
import Sockette from "sockette";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [ws, setWs] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={sendMessage}>Send Message</button>
      </header>
    </div>
  );
}

export default App;
