import React, { useState } from "react";
import "./app-footer.css";
import MicButton from "./mic-button/mic-button";
import SendButton from "./send-button/send-button";

export default function AppFooter() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    const textArea = e.target;
    setText(e.target.value);
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <div className="Input-container">
      <div className="Input-field">
        <MicButton />
        <textarea
          rows={1}
          type="text"
          placeholder="Ask anything about QoLT..."
          value={text}
          onChange={onChange}
        />
        <SendButton />
      </div>
    </div>
  );
}
