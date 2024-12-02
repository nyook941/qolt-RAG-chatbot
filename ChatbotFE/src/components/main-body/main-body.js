import React, { useEffect, useRef } from "react";
import "./main-body.css";
import { useSelector } from "react-redux";
import Request from "./request/request";
import Response from "./response/response";
import LoadingResponse from "./loading-response/loading-response";
import LoadingRequest from "./loading-request/loading-request";

export default function MainBody() {
  const { messages, isResponseLoading, isTranscribeLoading } = useSelector(
    (state) => state.chat
  );
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="Main-body" ref={divRef}>
      {/* Display instructional message if no messages exist */}
      {messages.length === 0 && (
        <div className="instruction-message">
          Welcome! Please upload a PDF or text file containing the information
          you want to learn. Then, ask any questions you have.
        </div>
      )}
      {/* Render messages */}
      {messages.map((message, index) => {
        if (message.messageType === "request") {
          return <Request key={index} message={message.memo} />;
        }
        if (message.messageType === "response") {
          return <Response key={index} message={message.memo} />;
        }
        return null;
      })}
      {/* Render loading indicators */}
      {isResponseLoading && <LoadingResponse />}
      {isTranscribeLoading && <LoadingRequest />}
    </div>
  );
}
