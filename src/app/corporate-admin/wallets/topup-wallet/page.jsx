"use client";

import React, { useState } from "react";
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
import CashDepositIcon from "../../../../assets/adminDashboard/cashDepositIcon.svg";
import CardTopUpIcon from "../../../../assets/adminDashboard/TopUpIcon.svg";
import RightArrow from "../../../../assets/adminDashboard/rightArrow.svg";
import Cashdepositmodal from "./cashdepositmodal";
import CardTopUpmodal from "./cardtopupmodal";

const TopUpWallet = () => {
  const [toggleCashDepositModal, setToggleCashDepositModal] = useState(false);
  const [toggleCardTopUpModal, setToggleCardTopUpModal] = useState(false);

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
        <article className="border-[#F0F0F0] rounded-[4px] border pt-4">
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
      <section className="flex flex-col w-[60%] border py-14 relative">
        <Cashdepositmodal
          toggleCashDepositModal={toggleCashDepositModal}
          handleCashDepositModal={handleCashDepositModal}
        />
        <CardTopUpmodal
          toggleCardTopUpModal={toggleCardTopUpModal}
          handleCardTopUpModal={handleCardTopUpModal}
        />
        <div className="flex flex-col items-center w-full">
          <div className="">
            <h1 className="text-xl font-semibold text-center mb-5">
              Top Up Wallet
            </h1>
            <div className="">
              {/* First Option */}
              <div
                className="flex items-center justify-between px-4 py-6 bg-[#FAFAFA] cursor-pointer w-[468px] mb-5"
                onClick={() => handleCashDepositModal()}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <Image
                      src={CashDepositIcon}
                      alt="Cash Deposit"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-[#1F1F1F] font-semibold">
                      Cash Deposit/ Bank Transfer
                    </p>
                    <p className="text-sm text-[#787878]">
                      Fund your account with nearby merchant
                    </p>
                  </div>
                </div>
                <div>
                  <Image src={RightArrow} alt="right arrow" />
                </div>
              </div>

              {/* Second Option */}
              <div
                className="flex items-center justify-between px-4 py-6 bg-[#FAFAFA] cursor-pointer w-[468px]"
                onClick={() => handleCardTopUpModal()}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <Image
                      src={CardTopUpIcon}
                      alt="Top Up with Card"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-[#1F1F1F] font-semibold">
                      Top Up with Card
                    </p>
                    <p className="text-sm text-[#787878]">
                      Fund your account directly from your bank card
                    </p>
                  </div>
                </div>
                <div>
                  <Image src={RightArrow} alt="right arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TopUpWallet;
