// "use client";
// import React, { useContext, useState } from "react";
// import { ConfigContext } from "../../../../../contexts/ConfigContext";
// import { Delete } from "@mui/icons-material";

// const UploadFile = ({ type }) => {
//   const { file, setFile, directorsDocs, setDirectorsDocs } = useContext(ConfigContext);
//   const [inputName, setInputName] = useState("");
//   const [fileName, setFileName] = useState("Drag and drop/Copy and paste file here");

//   const handleChange = (e) => {
//     const files = e.target.files;
//     console.log(e.target.name);
//     setInputName(e.target.name);
//     files[0] && setFileName(files[0].name);
//     if (files.length >= 1) {
//       setFile(files[0]);
//       handleUpload(files[0], type); // Make sure `handleUpload` is defined or imported
//     }
//   };

//   return (
//     <div className="h-full w-full flex flex-col pt-[100px]">
//       <h3 className="mb-[30px] font-bold text-[#262626] text-[20px] text-center">Bulk Transfer</h3>
//       <p className="text-[14px] w-[468px] mx-auto self-center text-[#434343] text-left">
//         Upload File For Bulk Payment
//       </p>
//       <div className="mx-auto self-center h-[254px] w-[468px] border-[#F0F0F0] border-[2px] bg-[#ffffff] rounded-[20px] mt-2 flex items-center justify-center">
//         <label className="text-center text-[12px] w-[202px]">
//           {file && type === inputName && (
//             <span className="-mt-[50px] mr-1">
//               <Delete
//                 style={{ fontSize: "20px" }}
//                 className="cursor-pointer"
//                 onClick={() => {
//                   setFileName("Drag and drop/Copy and paste file here");
//                   setFile(null);
//                 }}
//               />
//             </span>
//           )}
//           {fileName} or{" "}
//           <span
//             className="text-[#1890FF] cursor-pointer"
//             onClick={() => document.querySelector(".input-field")}
//           >
//             Upload File
//           </span>
//           <input
//             name={type} // Ensure this is correct
//             type="file"
//             hidden
//             onChange={handleChange}
//             accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             className="input-field"
//           />
//         </label>
//       </div>
//       <div className="flex justify-between items-center w-[468px] mx-auto self-center mt-5">
//         <button className="text-[#2c698d] border border-[[#2c698d]] rounded-[4px] w-[200px] h-[36px] bg-transparent">
//           Save File
//         </button>
//         <button className="bg-[#2c698d] w-[200px] h-[36px] rounded-[4px] text-white">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadFile;
