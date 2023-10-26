import React from "react";
import "./send-button.css";
import { useSelector, useDispatch } from "react-redux";
import { setAudioBlobUrl } from "../../../redux/slices/chat-slice";

export default function SendButton() {
  const dispatch = useDispatch();
  const blobUrl = useSelector((state) => state.chat.audioBlobUrl);

  const sendPrompt = () => {
    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blobData) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result.split(",")[1];
          console.log(base64Data);
        };
        reader.readAsDataURL(blobData);
      });
    dispatch(setAudioBlobUrl(""));
  };
  const { audioBlobUrl } = useSelector((state) => state.chat);

  return (
    <button
      className={audioBlobUrl !== "" ? "Send-Audio" : "Button"}
      onClick={sendPrompt}
    >
      <i
        className={
          audioBlobUrl !== "" ? "material-icons audio" : "material-icons"
        }
      >
        send
      </i>
    </button>
  );
}
