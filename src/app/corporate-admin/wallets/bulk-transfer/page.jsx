"use client";

import React, { useState, useReducer } from "react";
import Image from "next/image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// assets import
import USFlag from "../../../../assets/adminDashboard/UsFlag.svg";
import CADFlag from "../../../../assets/adminDashboard/CADFlag.svg";
import UKFlag from "../../../../assets/adminDashboard/UkFlag.svg";
import POLFlag from "../../../../assets/adminDashboard/PolFlag.svg";
import UploadFile from "./uploadFile/page";
import UploadStatus from "./uploadStatus/page";
import SavedFiles from "./savedFiles/page";
import GreenAdd from "../../../../assets/adminDashboard/blueCross.svg";
import GreyAdd from "../../../../assets/adminDashboard/greyCross.svg";
import SavedFilesIcon from "../../../../assets/adminDashboard/savedFiles.svg";
// import CashDepositIcon from "../../../../assets/adminDashboard/cashDepositIcon.svg";
// import CardTopUpIcon from "../../../../assets/adminDashboard/TopUpIcon.svg";
// import RightArrow from "../../../../assets/adminDashboard/rightArrow.svg";
// import Cashdepositmodal from "./cashdepositmodal";
// import CardTopUpmodal from "./cardtopupmodal";

const BulkTransfer = () => {
  const [toggleCashDepositModal, setToggleCashDepositModal] = useState(false);
  const [toggleCardTopUpModal, setToggleCardTopUpModal] = useState(false);
  const [navTab, setNavTab] = useState({
    uploadFiles: true,
    uploadStatus: false,
    savedFiles: false,
  });

  const handleActiveTab = (type) => {
    type === "UPLOAD_FILES"
      ? setNavTab({
          ...navTab,
          uploadFiles: true,
          uploadStatus: false,
          savedFiles: false,
        })
      : type === "UPLOAD_STATUS"
      ? setNavTab({
          ...navTab,
          uploadFiles: false,
          uploadStatus: true,
          savedFiles: false,
        })
      : type === "SAVED_FILES"
      ? setNavTab({
          ...navTab,
          uploadFiles: false,
          uploadStatus: false,
          savedFiles: true,
        })
      : { ...navTab };
  };

  const handleCashDepositModal = () => {
    setToggleCashDepositModal(!toggleCashDepositModal);
  };

  const handleCardTopUpModal = () => {
    setToggleCardTopUpModal(!toggleCardTopUpModal);
  };

  const exchangeRates = [
    {
      flag: USFlag,
      currency: "US Dollar",
      code: "USD",
      buying: "#890",
      selling: "#1,890",
    },
    {
      flag: CADFlag,
      currency: "Canadian Dollar",
      code: "CAD",
      buying: "#890",
      selling: "#1,890",
    },
    {
      flag: UKFlag,
      currency: "UK Euro",
      code: "EUR",
      buying: "#890",
      selling: "#1,890",
    },
    {
      flag: POLFlag,
      currency: "Polish Zloty",
      code: "PLN",
      buying: "#890",
      selling: "#1,890",
    },
  ];

  return (
    <main className=" flex bg-white  mt-4 mb-4 min-h-[800px]">
      <section className="w-[40%] flex flex-col mx-auto gap-y-10 px-8 py-16 border-r">
        <div className="bg-white w-full mt-4 flex flex-col px-2 rounded-md text-[#8C8C8C] text-sm">
          <article
            className={`${
              navTab.uploadFiles
                ? "border-l-2 border-[#2C698D] text-[#2C698D] bg-[#E3F6F5]"
                : "border-l-2 border-[#F0F0F0]"
            } h-full flex items-center w-32 cursor-pointer`}
            onClick={() => handleActiveTab("UPLOAD_FILES")}
          >
            <h2 className="py-2 pl-5 font-medium">Upload File</h2>
          </article>
          <article
            className={`${
              navTab.uploadStatus
                ? "border-l-2 border-[#2C698D] text-[#2C698D] bg-[#E3F6F5]"
                : "border-l-2 border-[#F0F0F0]"
            } h-full flex items-center w-32 cursor-pointer`}
            onClick={() => handleActiveTab("UPLOAD_STATUS")}
          >
            <h2 className="py-2 pl-5 font-medium">Upload Status</h2>
          </article>
          <article
            className={`${
              navTab.savedFiles
                ? "border-l-2 border-[#2C698D] text-[#2C698D] bg-[#E3F6F5]"
                : "border-l-2 border-[#F0F0F0]"
            } h-full flex items-center w-32 cursor-pointer`}
            onClick={() => handleActiveTab("SAVED_FILES")}
          >
            <div className="py-2 pl-4 font-medium flex">
              <Image
                src={SavedFilesIcon}
                alt="saved files icon"
                className="mr-2"
              />
              <h2 className="">Saved Files</h2>
            </div>
          </article>
        </div>
        <article className="border-[#F0F0F0] border pt-4">
          <span className="font-bold p-4">Exchange Rate</span>
          <TableContainer sx={{ marginTop: "16px" }}>
            <Table>
              <TableHead>
                <TableRow className="bg-[#FAFAFA]">
                  <TableCell align="left" className="text-gray-500 font-medium">
                    Currency
                  </TableCell>
                  <TableCell align="left" className="text-gray-500 font-medium">
                    Buying
                  </TableCell>
                  <TableCell align="left" className="text-gray-500 font-medium">
                    Selling
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exchangeRates.map((rate, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderTop: index === 0 ? "none" : "1px solid #FAFAFA",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div className="text-lg">
                        <Image src={rate.flag} alt="" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">
                          {rate.currency}
                        </p>
                        <p className="text-[#A0A0A0] text-[10px]">
                          {rate.code}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      className="text-gray-800"
                      sx={{
                        borderLeft: "1px solid #F0F0F0",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {rate.buying}
                    </TableCell>
                    <TableCell align="left" className="text-gray-800">
                      {rate.selling}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </article>
      </section>
      <section className="flex flex-col w-[60%] border relative">
        {navTab.uploadFiles ? (
          <UploadFile />
        ) : navTab.uploadStatus ? (
          <UploadStatus />
        ) : (
          <SavedFiles />
        )}
      </section>
    </main>
  );
};

export default BulkTransfer;
