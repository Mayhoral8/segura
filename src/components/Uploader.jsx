import React, { useState } from "react";

import { Delete } from "@mui/icons-material";

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(
    "Drag and drop/Copy and paste file here"
  );

  return (
    <div className="h-[60px] border-[#F0F0F0] border-[2px] bg-[#f5f5f5] rounded-[4px] mt-2 flex items-center justify-center">
      <label className="text-center text-[12px] w-[202px]">
        {file && (
          <span className="-mt-[50px] mr-1">
            <Delete
              style={{ fontSize: "20px" }}
              className="cursor-pointer"
              onClick={() => {
                setFileName("Drag andx drop/Copy and paste file here");
                setFile(null);
              }}
            />
          </span>
        )}
        {fileName} or{" "}
        <span
          className="text-[#1890FF] cursor-pointer"
          onClick={() => document.querySelector(".input-field")}
        >
          Edit File
        </span>
        <input
          name="file upload"
          type="file"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setFile(URL.createObjectURL(files[0]));
            }
          }}
          accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="input-field"
        />
      </label>
    </div>
  );
};

export default Uploader;
