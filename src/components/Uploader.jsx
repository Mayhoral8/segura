"use client";
import React, { useState, useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { useSession } from "next-auth/react";
import { Delete } from "@mui/icons-material";
import { toast } from "sonner";

const Uploader = ({ type, owner, setFieldValue, name }) => {
  const { data: session } = useSession();
  const {
    file,
    setFile,
    directorsDocs,
    setDirectorsDocs,
    corporateDocs,
    setCorporateDocs,
    userContext,
    directorInView,
    setDirectorInView,
  } = useContext(ConfigContext);
  const { userInView, setUserInView } = userContext;
  const [inputName, setInputName] = useState("");

  const [fileName, setFileName] = useState(
    "Drag and drop/Copy and paste file here"
  );

  const processDocuments = (document, url) => {
    return document?.map((doc) => {
      console.log(url, doc.name, type);
      if (doc.name === name) {
        return { ...doc, url };
      } else {
        return doc;
      }
    });
  };

  const handleUpload = async (file, type) => {
    console.log(directorInView);
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

      const { data: url } = await response.json();
      if (!response.ok) {
        console.log(response.error);
        throw new Error(response.error);
      }
      // console.log(url);

      // console.log(owner);
      if (owner === "director") {
        const newDocuments = processDocuments(directorsDocs, url);

        console.log(newDocuments);
        setDirectorsDocs(newDocuments);
      } else if (owner === "director-update") {
        // const { documents } = directorInView;
        const newDocuments = processDocuments(directorInView?.documents, url);

        console.log(newDocuments);
        setDirectorInView((prev) => {
          return { ...prev, documents: newDocuments };
        });
      } else if(owner === "corporate") {
        const newDocuments = processDocuments(corporateDocs, url);

        console.log(newDocuments);
        setCorporateDocs(newDocuments);
      }

      // setShowSpinner(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error(error.message);
      // setShowSpinner(false);
      // setShowErrorModal(true);
      // setErrorMsg(error.message); // Handle unexpected errors
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    setInputName(e.target.name);
    files[0] && setFileName(files[0].name);
    if (files.length >= 1) {
      setFile(files[0]);
      setFieldValue(type, files[0].name);
      handleUpload(files[0], name);
    }
  };

  return (
    <div className="h-[60px] border-[#F0F0F0] border-[2px] bg-[#f5f5f5] rounded-[4px] mt-2 flex items-center justify-center">
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
          accept="image/*"
          className="input-field"
        />
      </label>
    </div>
  );
};

export default Uploader;
