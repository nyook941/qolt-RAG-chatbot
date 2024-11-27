import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./uploaded-item.css";
import { GrDocumentTxt, GrDocumentPdf } from "react-icons/gr";
import { removeFile } from "../../../../redux/slices/chat-slice";

export default function UploadedItem({ filename }) {
  const dispatch = useDispatch();
  const getFileExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex === -1 || lastDotIndex === 0) return "";

    return filename.substring(lastDotIndex + 1);
  };

  const fileExtension = getFileExtension(filename);

  const handleDelete = () => {
    const apiUrl = `https://k5jhm1siei.execute-api.us-east-2.amazonaws.com/default/documents/${filename}`;

    fetch(apiUrl, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch(removeFile(filename));
      })
      .catch((error) => {
        console.error("There was an error deleting the file:", error);
      });
  };

  return (
    <div className="file-item-container">
      <div className="icon-name-container">
        {fileExtension === "txt" ? (
          <GrDocumentTxt style={{ marginRight: "10px" }} />
        ) : (
          <GrDocumentPdf style={{ marginRight: "10px" }} />
        )}
        {filename}
      </div>
      <button onClick={handleDelete}>
        <u>Remove</u>
      </button>
    </div>
  );
}
