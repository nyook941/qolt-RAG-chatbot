import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chatbot.css";
import AppHeader from "../app-header/app-header";
import MainBody from "../main-body/main-body";
import AppFooter from "../app-footer/app-footer";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer/drawer";
import Upload from "./upload/upload";
import { fetchUploadedFiles } from "../../redux/slices/chat-slice";

export default function Chatbot({ ws }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state) => state.auth);
  const { view } = useSelector((state) => state.chat);

  useEffect(() => {
    //   if (!loggedIn) {
    //     navigate("/");
    //   }
    dispatch(fetchUploadedFiles());
  }, []);

  return (
    <div className="App">
      <Drawer />
      <div className="Chat">
        {view === "chat" ? (
          <>
            <MainBody />
            <AppFooter ws={ws} />
          </>
        ) : (
          <Upload />
        )}
      </div>
    </div>
  );
}
