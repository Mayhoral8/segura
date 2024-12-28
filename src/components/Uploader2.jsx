"use client";
import React, { useState, useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { useSession } from "next-auth/react";
import { Delete } from "@mui/icons-material";

const Uploader = ({ type, user }) => {
  const { data: session } = useSession();
  const { file, setFile, corporateDocs, setCorporateDocs } =
    useContext(ConfigContext);
  const [inputName, setInputName] = useState("");

  const [fileName, setFileName] = useState(
    "Drag and drop/Copy and paste file here"
  );

  console.log(corporateDocs);
  const handleUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/file`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(response.error);
        throw new Error(response.error);
      }
      console.log(responseData);
      // toast.success("Details Update Succesful!");

      const newDocuments = corporateDocs.map((doc) => {
        // console.log(doc);
        if (doc.name === type) {
          return { ...doc, url: responseData.data };
        } else {
          return doc;
        }
      });

      console.log(newDocuments);
      setCorporateDocs(newDocuments);

      // setShowSpinner(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      // setShowSpinner(false);
      // setShowErrorModal(true);
      // setErrorMsg(error.message); // Handle unexpected errors
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    console.log(e.target.name);
    setInputName(e.target.name);
    files[0] && setFileName(files[0].name);
    if (files.length >= 1) {
      setFile(files[0]);
      handleUpload(files[0], type);
    }
  };

  return (
    <div className="h-[254px] w-[468px] border-[#F0F0F0] border-[2px] bg-[#f5f5f5] rounded-[4px] mt-2 flex items-center justify-center">
      <label className="text-center text-[12px] w-[202px]">
        {file && type === inputName && (
          <span className="-mt-[50px] mr-1">
            <Delete
              style={{ fontSize: "20px" }}
              className="cursor-pointer"
              onClick={() => {
                setFileName("Drag and drop/Copy and paste file here");
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
          Upload File
        </span>
        <input
          name={type}
          type="file"
          hidden
          onChange={handleChange}
          accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="input-field"
        />
      </label>
    </div>
  );
};

export default Uploader;
