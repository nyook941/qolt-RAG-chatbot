import React, { useEffect, useState } from "react";
import "./response.css";

export default function Response({ message }) {
  const [className, setClassName] = useState("slide-up-enter");

  useEffect(() => {
    setClassName("slide-up-enter-active");
  }, []);

  return (
    <div className="Response-container">
      <header className={`Response ${className}`}>{message}</header>
    </div>
  );
}
