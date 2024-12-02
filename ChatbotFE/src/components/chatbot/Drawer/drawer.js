import React, { useState } from "react";
import "./drawer.css";
import { FaFileUpload } from "react-icons/fa";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../redux/slices/chat-slice";

export default function Drawer() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.chat);

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  const handleUploadClick = () => {
    dispatch(setView("upload"));
  };

  const handleChatClick = () => {
    dispatch(setView("chat"));
  };

  return (
    <div className={`Drawer ${collapsed ? "Drawer-Collapsed" : ""}`}>
      <button className="Toggle-Button" onClick={toggleDrawer}>
        <FiMenu />
      </button>
      <button
        className={view === "chat" ? "Upload-Button-Selected" : "Upload-Button"}
        onClick={handleChatClick}
      >
        <span className="Button-Icon">
          <IoChatboxEllipsesSharp />
        </span>
        {!collapsed && "Chatbot"}
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
        {!collapsed && "Upload Knowledge Base"}
      </button>
    </div>
  );
}
