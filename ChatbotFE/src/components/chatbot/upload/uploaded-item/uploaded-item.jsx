import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./uploaded-item.css";
import { GrDocumentTxt, GrDocumentPdf } from "react-icons/gr";

export default function UploadedItem({ filename }) {
  const getFileExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex === -1 || lastDotIndex === 0) return "";

    return filename.substring(lastDotIndex + 1);
  };

  const fileExtension = getFileExtension(filename);

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
      <button>
        <u>Remove</u>
      </button>
    </div>
  );
}
