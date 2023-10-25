import React, { useState } from "react";
import "./app-footer.css";

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
        <textarea
          type="text"
          placeholder="Ask anything about QoLT..."
          value={text}
          onChange={onChange}
        />
        <i className="material-icons">mic</i>
      </div>
    </div>
  );
}
