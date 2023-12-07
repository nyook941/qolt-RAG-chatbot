import React from "react";
import "./drawer.css";
import { FaFileUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../redux/slices/chat-slice";
import { IoChatboxEllipsesSharp } from "react-icons/io5";

export default function Drawer() {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.chat);

  const handleUploadClick = () => {
    dispatch(setView("upload"));
  };

  const handleChatClick = () => {
    dispatch(setView("chat"));
  };

  return (
    <div className="Drawer">
      <img src={"/header.jpg"} className="Qolt-logo" />
      <button
        className={view === "chat" ? "Upload-Button-Selected" : "Upload-Button"}
        onClick={handleChatClick}
      >
        <span className="Button-Icon">
          <IoChatboxEllipsesSharp />
        </span>
        Chatbot
      </button>
      <button
        className={
          view === "upload" ? "Upload-Button-Selected" : "Upload-Button"
        }
        onClick={handleUploadClick}
      >
        <span className="Button-Icon">
          <FaFileUpload />
        </span>
        Upload Knowledge Base
      </button>
    </div>
  );
}
