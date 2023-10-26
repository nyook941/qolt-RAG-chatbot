import React, { useEffect, useState } from "react";
import "./request.css";

export default function Request({ message }) {
  const [className, setClassName] = useState("slide-up-enter");

  useEffect(() => {
    setClassName("slide-up-enter-active");
  }, []);

  return (
    <div className="Request-container">
      <header className={`Request ${className}`}>{message}</header>
    </div>
  );
}
