import React from "react";
import logo from "../../logo.svg";

export default function MainBody() {
  return (
    <div className="Main-body">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
