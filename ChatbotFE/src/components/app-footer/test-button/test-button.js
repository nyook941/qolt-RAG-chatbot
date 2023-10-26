import React, { useState } from "react";
import "./test-button.css";
import { useDispatch } from "react-redux";

export default function TestButton() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("Who is Professor Tamil?"); 
  const [chatbotResponse, setChatbotResponse] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const sendRequestToFastAPI = () => {
    const url = "http://localhost:8000/api/chatbot"; // FastAPI endpoint URL

    // JSON object with the input data
    const requestData = {
      text: inputText,
    };

    // POST request to the FastAPI endpoint
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        setChatbotResponse(data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
        setChatbotResponse("An error occurred while sending the request.");
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="Button" onClick={sendRequestToFastAPI}>
        Send Request
      </button>
      {chatbotResponse && (
        <div className="Chatbot-Response">
          <strong>Response:</strong> {chatbotResponse}
        </div>
      )}
    </div>
  );
}
