import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign-up.css";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateClick = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        setError(err.message || "Sign-up failed");
        return;
      }
      navigate("/auth/confirm", { state: { email } });
    });
  };

  return (
    <div className="Signup-container">
      <header className="Title-container">
        Create your account
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleCreateClick} className="Continue-button">
          Sign Up
        </button>
      </header>
    </div>
  );
}
