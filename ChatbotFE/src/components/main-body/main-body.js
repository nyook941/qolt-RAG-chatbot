import React from "react";
import "./main-body.css";
import logo from "../../logo.svg";

export default function MainBody({ ws }) {
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

  return (
    <div className="Main-body">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
