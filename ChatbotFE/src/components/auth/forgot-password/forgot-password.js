import React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <div class="Signup-container">
      <img src="/utd-logo.png" class="Utd-logo" />
      <header class="Title-container">
        Reset your password
        <div className="subheader">
          We will send you reset instructions to your email
        </div>
        <input type="text" placeholder="Email address" />
        <button class="Continue-button" onClick={handleContinueClick}>
          Continue
        </button>
        <button class="Nav-back-login" onClick={handleBackClick}>
          Back to log in
        </button>
      </header>
    </div>
  );
}
