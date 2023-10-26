// TestButton.js
import React, { useState } from "react";
import "./test-button.css";
import sendRequestToFastAPI from "./send-request-to-fastAPI";

export default function TestButton() {
  const [inputText, setInputText] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendRequest = () => {
    sendRequestToFastAPI(inputText, setChatbotResponse);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="Button" onClick={handleSendRequest}>
        Send Request
      </button>
      {chatbotResponse && (
        <div className="Chatbot-Response">
          <strong>Response:</strong> {chatbotResponse}
        </div>
      )}
    </div>
  );
};
