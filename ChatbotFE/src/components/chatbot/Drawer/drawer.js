import React from "react";
import "./drawer.css";
import { FaFileUpload } from "react-icons/fa";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../redux/slices/chat-slice";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export default function Drawer() {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.chat);

  const handleUploadClick = () => {
    dispatch(setView("upload"));
  };

  const handleChatClick = () => {
    dispatch(setView("chat"));
  };

  const handleLogout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="Drawer">
      <div>
        <img src={"/header.jpg"} className="Qolt-logo" alt="Logo" />
        <button
          className={
            view === "chat" ? "Upload-Button-Selected" : "Upload-Button"
          }
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
      <div>
        <button className="Logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
