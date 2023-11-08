import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginEmail, setLoginPass } from "../../../redux/slices/auth-slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(true);

  const { loginEmail, loginPass } = useSelector((state) => state.auth);

  const handleContinueClick = () => {
    if (!errors) {
      navigate("/");
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

  return (
    <div class="Signup-container">
      <img src="/utd-logo.png" class="Utd-logo" />
      <header class="Title-container">
        Welcome back
        <input type="text" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <button
          class={errors ? "Errors-button" : "Continue-button"}
          onClick={handleContinueClick}
        >
          Continue
        </button>
        <div className="subheader">
          Don't have an account?{" "}
          <button class="Nav-back-login" onClick={handleSignupClick}>
            Sign up
          </button>
        </div>
        <button class="Nav-back-login" onClick={handleForgotClick}>
          Forgot password?
        </button>
      </header>
    </div>
  );
}
