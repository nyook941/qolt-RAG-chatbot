import React, { useEffect, useRef } from "react";
import "./main-body.css";
import { useSelector } from "react-redux";
import Request from "./request/request";
import Response from "./response/response";

export default function MainBody() {
  const messages = useSelector((state) => state.chat.messages);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="Main-body" ref={divRef}>
      {messages.map((message, index) => {
        if (message.messageType === "request") {
          return <Request key={index} message={message.memo} />;
        }
        if (message.messageType === "response") {
          return <Response key={index} message={message.memo} />;
        }
        return null;
      })}
    </div>
  );
}
