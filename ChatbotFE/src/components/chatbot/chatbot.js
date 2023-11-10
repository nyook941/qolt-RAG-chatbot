import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chatbot.css";
import AppHeader from "../app-header/app-header";
import MainBody from "../main-body/main-body";
import AppFooter from "../app-footer/app-footer";
import { useNavigate } from "react-router-dom";

export default function Chatbot({ ws }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <MainBody />
      <AppFooter ws={ws} />
    </div>
  );
}
