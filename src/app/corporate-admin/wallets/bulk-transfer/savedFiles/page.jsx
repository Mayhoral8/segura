"use client";
import React, { useState } from "react";
import Image from "next/image";

// asset importation
import BackArrow from "../../../../../assets/adminDashboard/arrowback.svg";

const SavedFiles = () => {
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item

  const items = [
    {
      id: 1,
      name: "HR Team",
      description: "PDF Document/ Uploaded July 20th 2025",
    },
    {
      id: 2,
      name: "Frontend Developers",
      description: "PDF Document/ Uploaded July 20th 2025",
    },
    {
      id: 3,
      name: "Senior Devops Team",
      description: "PDF Document/ Uploaded July 20th 2025",
    },
  ];

  return (
    <div className="w-full h-full relative px-[100px] py-[50px]">
      <div
        className="absolute left-[50px] cursor-pointer"
        //   onClick={() => handleToggleBusinessInfoModal()}
      >
        <Image src={BackArrow} alt="back arrow" />
      </div>
      <div className="h-full w-full overflow-scroll relative">
        <div className="flex justify-between items-center">
          <div className="">
            <h4 className="text-[#1F1F1F] text-[20px] font-bold leading-none mb-10">
              Saved Files/ Uploads
            </h4>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search Group file"
          className="w-full border border-[#F0F0F0] rounded-lg p-2 h-[40px] bg-[#FAFAFA] mb-4 placeholder:text-[14px]"
        />
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`border ${
                selectedItem === item.id
                  ? "border-[#09DD49]"
                  : "border-transparent"
              } rounded-lg p-4 h-[70px] shadow-md cursor-pointer flex justify-between items-center`}
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-[#595959] text-[12px]">{item.description}</p>
              </div>
              {/* Fixing image overflow */}
              <div className="flex relative overflow-hidden w-[80px] h-[40px]">
                <span className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full text-xs absolute left-0">
                  TJ
                </span>
                <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-xs absolute left-4">
                  OW
                </span>
                <span className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full text-xs absolute left-8">
                  KO
                </span>
                <span className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full text-xs absolute left-12 border border-gray-300">
                  +20
                </span>
              </div>
            </div>
          ))}
        </div>
        {selectedItem && (
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-200"
              onClick={() => setSelectedItem(null)} // Reset selection
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedFiles;
