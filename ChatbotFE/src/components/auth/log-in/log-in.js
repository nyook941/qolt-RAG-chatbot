import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAttemptingLogin,
  setLoginEmail,
  setLoginError,
  setLoginPass,
} from "../../../redux/slices/auth-slice";
import "./log-in.css";

export default function Login({ ws }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(true);

  const { loginEmail, loginPass, attemptingLogin, loginError, loggedIn } =
    useSelector((state) => state.auth);

  const handleContinueClick = () => {
    const message = {
      action: "loginUser",
      message: {
        username: loginEmail,
        password: loginPass,
      },
    };
    if (!empty) {
      ws.send(JSON.stringify(message));
      dispatch(setAttemptingLogin(true));
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleForgotClick = () => {
    navigate("/forgot");
  };

  const handleEmailChange = (e) => {
    dispatch(setLoginEmail(e.target.value));
  };

  const handlePassChange = (e) => {
    dispatch(setLoginPass(e.target.value));
  };

  useEffect(() => {
    setEmpty(loginEmail === "" || loginPass === "");
    dispatch(setLoginError(false));
  }, [loginEmail, loginPass]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/chatbot");
    }
  }, [loggedIn]);

  return (
    <div className="Signup-container">
      <img src="/utd-logo.png" className="Utd-logo" />
      <header className="Title-container">
        Welcome back
        <input
          type="text"
          placeholder="Email address"
          onChange={handleEmailChange}
          className={loginError ? "error" : ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassChange}
          className={loginError ? "error" : ""}
        />
        {loginError && (
          <div className="error-message">
            Invalid email address or password.
          </div>
        )}
        <button
          className={
            loginError || empty || attemptingLogin
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
