import React from "react";
import "./drawer.css";
import { FaFileUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../redux/slices/chat-slice";

export default function Drawer() {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.chat);

  const handleClick = () => {
    view === "upload" ? dispatch(setView("chat")) : dispatch(setView("upload"));
  };

  return (
    <div className="Drawer">
      <img src={"/header.jpg"} className="Qolt-logo" />
      <button className="Upload-Button" onClick={handleClick}>
        <span className="Button-Icon">
          <FaFileUpload />
        </span>
        Upload Knowledge Base
      </button>
    </div>
  );
}
