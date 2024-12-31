"use client";
import React, { useContext, useState } from "react";
import { ConfigContext } from "../../../../../contexts/ConfigContext";
import FileIcon from "../../../../../assets/adminDashboard/afile.svg";
import Image from "next/image";
import { Delete } from "@mui/icons-material";

const UploadFile = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleFileDelete = () => {
    setFileName("No selected file");
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center pt-[70px]">
      <h2 className="font-bold text-[20px] mb-10">Bulk Transfer</h2>
      <div className="w-[466px] mb-3">Upload File For Bulk Payment</div>
      <div className="h-[254px] flex items-center justify-center flex-col w-[466px] border-2 border-[#F0F0F0] bg-[#F5F5F5] rounded-[8px]">
        <input
          type="file"
          accept="image/*"
          name=""
          className="input"
          hidden
          onChange={({ target: { files } }) => {
            if (files && files[0]) {
              setFileName(files[0].name);
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        <div className="max-w-[207px] flex flex-col items-center text-center">
          <Image src={FileIcon} alt="File Icon" />
          {fileName !== "No selected file" ? (
            <p className="font-semibold mt-2">{fileName}</p>
          ) : (
            <p>
              Drag the file here to upload or{" "}
              <span
                onClick={() => document.querySelector(".input").click()}
                className="text-[#1890FF] cursor-pointer"
              >
                Choose New File
              </span>
            </p>
          )}
        </div>
      </div>

      {fileName !== "No selected file" && (
        <div className="flex items-center gap-2 mt-2 justify-end w-[466px]">
          <span>{fileName}</span>
          <Delete
            style={{ fontSize: "20px" }}
            className="cursor-pointer"
            onClick={handleFileDelete}
          />
        </div>
      )}

      <div className="flex gap-4 mt-5 w-[466px] justify-between">
        <button className="w-[200px] bg-[#F5F5F5] border-[1px] border-[#D9D9D9] h-[36px] rounded-[4px]">
          Save File
        </button>
        <button className="w-[200px] bg-[#2C698D] text-white h-[36px] rounded-[4px]">
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
