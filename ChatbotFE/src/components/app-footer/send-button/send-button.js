import React, { useState } from "react";
import "./send-button.css";

export default function SendButton() {
  const sendPrompt = () => {};

  return (
    <button className="Button" onClick={sendPrompt}>
      <i className="material-icons">send</i>
    </button>
  );
}
