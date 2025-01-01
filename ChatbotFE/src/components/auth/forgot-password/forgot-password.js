import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleContinueClick = () => {
    if (!email) {
      setError("Email address is required.");
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setMessage("Reset instructions sent to your email.");
        navigate("/auth/confirm", { state: { email, isPasswordReset: true } });
      },
      onFailure: (err) => {
        setError(err.message || "Error initiating password reset.");
      },
    });
  };

  const handleBackClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="Signup-container">
      <img src="/utd-logo.png" className="Utd-logo" />
      <header className="Title-container">
        Reset your password
        <div className="subheader">
          We will send you reset instructions to your email
        </div>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button className="Continue-button" onClick={handleContinueClick}>
          Continue
        </button>
        <button className="Nav-back-login" onClick={handleBackClick}>
          Back to log in
        </button>
      </header>
    </div>
  );
}
