import React from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="Login-screen">
      <img src={"/utdallas-campus.jpg"} className="Utd-background" />
      <header className="Logo">
        <img src={"/header.jpg"} />
      </header>
      <header className="Title-container">
        Learn about the Quality of Life Technology Lab
        <header className="Auth-button-container">
          <button onClick={handleLoginClick}>Log in</button>
          <button onClick={handleSignUpClick}>Sign up</button>
        </header>
        <img src={"/utd-logo.png"} className="Utd-logo" />
      </header>
    </div>
  );
}
