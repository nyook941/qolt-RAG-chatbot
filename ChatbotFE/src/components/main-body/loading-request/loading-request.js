import React, { useEffect, useState } from "react";
import "./loading-request.css";

export default function LoadingRequest() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className={`Loading-request-container ${!isVisible ? "hide" : ""}`}>
      <div>
        <img src={"/loading.gif"} className="Loading-request"></img>
      </div>
    </div>
  );
}
