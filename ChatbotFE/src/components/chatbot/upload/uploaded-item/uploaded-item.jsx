import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./uploaded-item.css";
import {
  GrDocumentTxt,
  GrDocumentPdf,
  GrCheckmark,
  GrClose,
} from "react-icons/gr";

export default function UploadedItem({ filename, status }) {
  const fileExtension = filename.substring(
    filename.length - 3,
    filename.length
  );

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
      <div className="icon-name-container">
        {status === "false" ? (
          <GrCheckMark style={{ marginRight: "10px" }} />
        ) : (
          <GrDocumentPdf style={{ marginRight: "10px" }} />
        )}
        {filename}
      </div>
    </div>
  );
}
