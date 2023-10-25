import React, { useState } from "react";
import "./mic-button.css";

export default function MicButton() {
  const startRecording = () => {};

  return (
    <button className="Button" onClick={startRecording}>
      <i className="material-icons">mic</i>
    </button>
  );
}
