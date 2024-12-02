// AppFooter.js
import React, { useState } from "react";
import "./app-footer.css";
import MicButton from "./mic-button/mic-button";
import SendButton from "./send-button/send-button";
import { useSelector } from "react-redux";
import CancelButton from "./cancel-button/cancel-button";

export default function AppFooter({ ws }) {
  const [text, setText] = useState("");
  const { audioBlobUrl } = useSelector((state) => state.chat);

  const onChange = (e) => {
    const textArea = e.target;
    setText(e.target.value);
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <div className="Input-container">
      <div className="Input-field">
        {audioBlobUrl !== "" ? <CancelButton /> : <MicButton />}
        {audioBlobUrl !== "" ? (
          <header className="confirmation">Confirm send</header>
        ) : (
          <textarea
            rows={1}
            type="text"
            placeholder="Ask a question..."
            value={text}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
        )}
        <SendButton ws={ws} text={text} setText={setText} />
      </div>
    </div>
  );
}
