import React from "react";
import "./cancel-button.css";
import { useSelector, useDispatch } from "react-redux";
import { setAudioBlobUrl } from "../../../redux/slices/chat-slice";

export default function CancelButton() {
  const dispatch = useDispatch();
  const cancelAudio = () => {
    dispatch(setAudioBlobUrl(""));
  };

  return (
    <button className="Cancel-audio-button" onClick={cancelAudio}>
      <i className="material-icons cancel-audio">cancel</i>
    </button>
  );
}
