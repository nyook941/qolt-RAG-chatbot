import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import "./log-in.css";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attemptingLogin, setAttemptingLogin] = useState(false);

  const handleContinueClick = () => {
    setAttemptingLogin(true);

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("refreshToken", refreshToken);

        setAttemptingLogin(false);
        navigate("/chatbot");
      },
      onFailure: (err) => {
        setError(err.message || "Login failed");
        setAttemptingLogin(false);
      },
    });
  };

  const handleSignupClick = () => {
    navigate("/auth/signup");
  };

  const handleForgotClick = () => {
    navigate("/auth/forgot");
  };

  useEffect(() => {
    setError(""); // Clear error when email or password changes
  }, [email, password]);

  return (
    <div className="Signup-container">
      <img src="/utd-logo.png" className="Utd-logo" />
      <header className="Title-container">
        Welcome back
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error ? "error" : ""}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? "error" : ""}
        />
        {error && <div className="error-message">{error}</div>}
        <button
          className={
            error || !email || !password || attemptingLogin
              ? "Errors-button"
              : "Continue-button"
          }
          disabled={attemptingLogin}
          onClick={handleContinueClick}
        >
          <span>Continue</span>
          {attemptingLogin && (
            <img src={"/loading-alt.gif"} className="Loading-login" />
          )}
        </button>
        <div className="subheader">
          Don't have an account?{" "}
          <button className="Nav-back-login" onClick={handleSignupClick}>
            Sign up
          </button>
        </div>
        <button className="Nav-back-login" onClick={handleForgotClick}>
          Forgot password?
        </button>
      </header>
    </div>
  );
}
