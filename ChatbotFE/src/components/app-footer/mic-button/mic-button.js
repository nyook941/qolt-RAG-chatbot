import React, { useEffect, useState } from "react";
import "./mic-button.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioBlobUrl,
  setIsMicBlocked,
  setIsRecording,
} from "../../../redux/slices/chat-slice";
import MicRecorder from "mic-recorder-to-mp3";

export default function MicButton() {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { isRecording, isMicBlocked, audioBlobUrl } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log("Permission Granted");
        dispatch(setIsMicBlocked(false));
      })
      .catch(() => {
        console.log("Permission Denied");
        dispatch(setIsMicBlocked(true));
      });
  }, []);

  const startRecording = () => {
    if (!btnDisabled) {
      setBtnDisabled(true);
      setTimeout(() => setBtnDisabled(false), 500);
      if (isMicBlocked) {
        console.log("permission denied");
      } else {
        console.log("starting recording");
        recorder
          .start()
          .then(() => {
            dispatch(setIsRecording(true));
          })
          .catch((e) => console.error(e));
      }
    }
  };

  const stopRecording = () => {
    if (!btnDisabled) {
      setBtnDisabled(true);
      setTimeout(() => setBtnDisabled(false), 500);
      if (isRecording) {
        console.log("stopping recording");
        recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob);
            dispatch(setIsRecording(false));
            dispatch(setAudioBlobUrl(blobURL));
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <button
      className={`Button ${isRecording ? "recording" : ""}`}
      onClick={isRecording ? stopRecording : startRecording}
      disabled={btnDisabled}
    >
      <i className="material-icons">mic</i>
    </button>
  );
}
