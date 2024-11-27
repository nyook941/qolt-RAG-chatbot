import React, { useEffect, useState } from "react";
import "./mic-button.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioBlobUrl,
  setIsMicBlocked,
  setIsRecording,
  setIsRecordingSendPending,
} from "../../../redux/slices/chat-slice";
import MicRecorder from "mic-recorder-to-mp3";

export default function MicButton() {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const { isRecording, isMicBlocked } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [audioStream, setAudioStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);
        dispatch(setIsMicBlocked(false));
      })
      .catch(() => {
        dispatch(setIsMicBlocked(true));
      });
  }, []);

  useEffect(() => {
    if (isRecording && !audioContext && audioStream) {
      const context = new AudioContext();
      setAudioContext(context);

      const audioSrc = context.createMediaStreamSource(audioStream);
      const analyserNode = context.createAnalyser();
      audioSrc.connect(analyserNode);
      setAnalyser(analyserNode);
    }
  }, [isRecording, audioContext, audioStream]);

  useEffect(() => {
    if (isRecording && analyser) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const level =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setAudioLevel(Math.min(20, Math.floor(level / 1.7)) + 5);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [analyser, isRecording]);

  const startRecording = () => {
    if (!btnDisabled) {
      setBtnDisabled(true);
      setTimeout(() => setBtnDisabled(false), 500);
      if (isMicBlocked) {
      } else {
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
        recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob);
            dispatch(setIsRecording(false));
            dispatch(setIsRecordingSendPending(true));
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
      style={{ boxShadow: `0 0 0 ${audioLevel}px green` }}
    >
      <i className="material-icons">mic</i>
    </button>
  );
}
