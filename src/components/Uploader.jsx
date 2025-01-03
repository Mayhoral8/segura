"use client";
import React, { useState, useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { useSession } from "next-auth/react";
import { Delete } from "@mui/icons-material";
import { toast } from "sonner";

const Uploader = ({
  type,
  owner,
  name,
  documentId,
  handleUploadMode,
  setFieldValue,
}) => {
  const { data: session } = useSession();
  const {
    file,
    setFile,
    directorsDocs,
    setDirectorsDocs,
    corporateDocs,
    setCorporateDocs,
    directorInView,
    setDirectorInView,
    spinner,
  } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;

  const [inputName, setInputName] = useState("");

  const [fileName, setFileName] = useState(
    "Drag and drop/Copy and paste file here"
  );

  const processDocuments = (document, url) => {
    console.log(document, url);
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
    setShowSpinner(true);

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

      if (owner === "director") {
        const newDocuments = processDocuments(directorsDocs, url);

        console.log(newDocuments);
        setShowSpinner(false);

        setDirectorsDocs(newDocuments);
      } else if (owner === "director-update") {
        // const newDocuments = processDocuments(directorInView?.documents, url);

        // console.log(newDocuments);
        // setDirectorInView((prev) => {
        //   return { ...prev, documents: newDocuments };
        // });
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${documentId}/documents`,
            {
              method: "PUT",
              body: JSON.stringify({
                name,
                url,
              }),
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(response.error);
          } else {
            setShowSpinner(false);
            toast.success(responseData.data);
            console.log(type);
            handleUploadMode(type);
          }
          // console.log(responseData);
        } catch (err) {
          setShowSpinner(false);
          toast.error(err.message);
        }
      } else if (owner === "corporate") {
        const newDocuments = processDocuments(corporateDocs, url);

        console.log(newDocuments);
        setShowSpinner(false);

        setCorporateDocs(newDocuments);
      }

      // setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);

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
      if (owner !== "director-update") {
        setFieldValue(type, files[0].name);
      }
      handleUpload(files[0], type);
    }
  };

  return (
    <div className="h-[60px] border-[#F0F0F0] border-[2px] bg-[#f5f5f5] rounded-[4px] mt-2 flex items-center justify-center">
      <div className="text-center text-[12px] w-[202px]">
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
          type="file"
          hidden
          onChange={handleChange}
          accept="image/*"
          className="input-field"
        />
      </div>
    </div>
  );
};

export default Uploader;
