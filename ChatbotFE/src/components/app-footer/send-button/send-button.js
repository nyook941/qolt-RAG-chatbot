import React, { useCallback } from "react";
import "./send-button.css";
import { useSelector, useDispatch } from "react-redux";
import { setAudioBlobUrl } from "../../../redux/slices/chat-slice";
import { S3 } from "aws-sdk";
import axios from "axios";
import { Buffer } from "buffer";

export default function SendButton({ ws }) {
  const dispatch = useDispatch();
  const blobUrl = useSelector((state) => state.chat.audioBlobUrl);
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const sendAudio = useCallback(async () => {
    console.log("attempting to send to s3");
    const fileName = `recording-${Date.now()}.mp3`;
    try {
      if (!blobUrl) {
        console.error("Blob URL is empty.");
        return;
      }

      const response = await axios.get(blobUrl, {
        responseType: "arraybuffer",
      });

      if (response.status === 200) {
        const audioBlob = Buffer.from(response.data);
        console.log("retrieved audio");

        const params = {
          Bucket: "pre-transcribed-mp3-bucket",
          Key: fileName,
          Body: audioBlob,
        };

        s3.upload(params, (err, data) => {
          if (err) {
            console.error("Error uploading to S3:", err);
          } else {
            console.log("File uploaded to S3:", data.Location);
          }
        });
      } else {
        console.error("Failed to download audio.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      dispatch(setAudioBlobUrl(""));
      if (ws) {
        const payload = {
          action: "startTranscription",
          message: fileName,
        };
        ws.json(payload);
        console.log("Sent:", payload);
      }
    }
  }, [blobUrl, dispatch, s3]);

  return (
    <button
      className={blobUrl !== "" ? "Send-Audio" : "Button"}
      onClick={sendAudio}
    >
      <i className={blobUrl !== "" ? "material-icons audio" : "material-icons"}>
        send
      </i>
    </button>
  );
}
