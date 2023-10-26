import React, { useEffect, useState } from "react";
import "./loading-response.css";

export default function LoadingResponse() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className={`Loading-response-container ${!isVisible ? "hide" : ""}`}>
      <div>
        <img src={"/loading.gif"} className="Loading-response"></img>
      </div>
    </div>
  );
}
