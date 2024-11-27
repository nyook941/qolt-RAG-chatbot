import React, { useState, useCallback, useRef } from "react";
import "./upload.css";
import UploadedItem from "./uploaded-item/uploaded-item";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../../../redux/slices/chat-slice";

export default function Upload() {
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const { uploadedFiles } = useSelector((state) => state.chat);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileValidation = (file) => {
    const allowedTypes = ["text/plain", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Invalid file type");
      return false;
    }
    setErrorMessage(""); // Clear any previous error message
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && handleFileValidation(files[0])) {
      uploadFile(files[0]);
    }
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && handleFileValidation(file)) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const url =
      "https://k5jhm1siei.execute-api.us-east-2.amazonaws.com/default/documents?file-name=" +
      file.name;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/txt",
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        dispatch(addFile(file.name));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="Upload-Text">
      <div
        className="dotted-border-rectangle"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ backgroundColor: dragOver ? "#f0f0f0" : "transparent" }}
      >
        Drag and drop files here <br /> or
        <button onClick={handleButtonClick}>Select file</button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <p>file must be .txt or .pdf</p>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      {uploadedFiles.files.map((filename) => (
        <UploadedItem key={filename} filename={filename} />
      ))}
    </div>
  );
}
