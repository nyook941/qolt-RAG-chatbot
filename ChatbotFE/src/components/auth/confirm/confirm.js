import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export default function Confirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, isPasswordReset } = state || {}; // isPasswordReset determines the confirmation type
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    navigate(isPasswordReset ? "/auth/forgot-password" : "/auth/signup"); // Redirect based on confirmation type
    return null;
  }

  const handleConfirmClick = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    if (isPasswordReset) {
      // Confirm password reset
      if (!newPassword) {
        setError("Please enter a new password.");
        return;
      }

      user.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          navigate("/auth/login"); // Redirect to login on success
        },
        onFailure: (err) => {
          setError(err.message || "Password reset confirmation failed.");
        },
      });
    } else {
      // Confirm user registration
      user.confirmRegistration(confirmationCode, true, (err) => {
        if (err) {
          setError(err.message || "Signup confirmation failed.");
          return;
        }
        navigate("/auth/login"); // Redirect to login on success
      });
    }
  };

  return (
    <div className="Signup-container">
      <header className="Title-container">
        {isPasswordReset
          ? "Reset Your Password"
          : "Check Your Email for Verification Code"}
        <input
          type="text"
          placeholder="Confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        {isPasswordReset && (
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        )}
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleConfirmClick} className="Continue-button">
          {isPasswordReset ? "Reset Password" : "Confirm"}
        </button>
      </header>
    </div>
  );
}
