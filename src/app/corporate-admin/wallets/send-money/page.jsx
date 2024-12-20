import React, { useState } from "react";
import TableComponent from "../../../../components/Table";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import Beneficiaries from "./beneficiaries/page";

import NewTransfer from "./new-transfer/page";

const SendMoney = () => {
  const [sendMoneyCtg, setSendMoneyCtg] = useState({
    beneficiaries: true,
    newTransfer: false,
    scheduleTransfer: false,
  });

  const handleSendMoneyCtgChange = (type) => {
    type === "BENEFICIARIES"
      ? setSendMoneyCtg({
          ...sendMoneyCtg,
          beneficiaries: true,
          newTransfer: false,
          scheduleTransfer: false,
        })
      : type === "NEW_TRANSFER"
      ? setSendMoneyCtg({
          ...sendMoneyCtg,
          beneficiaries: false,
          newTransfer: true,
          scheduleTransfer: false,
        })
      : type === "SCHEDULE_TRANSFER"
      ? setSendMoneyCtg({
          ...sendMoneyCtg,
          beneficiaries: false,
          newTransfer: false,
          scheduleTransfer: true,
        })
      : setSendMoneyCtg({ ...sendMoneyCtg });
  };

  const tableHeaders = ["Currency", "Buying", "Selling"];
  const tableValues = [
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
  ];

  return (
    <main className=" flex bg-white  mt-4 mb-4 min-h-[800px]">
      <section className="w-[40%] flex flex-col mx-auto justify-center gap-y-10 px-8 border-r">
        <article className="border-l-2 flex flex-col gap-y-4 ml-2 text-[#787878] w-[60%]">
          <div
            className={`${
              sendMoneyCtg.beneficiaries && "bg-[#E3F6F5]"
            } flex gap-x-2 items-center  px-2 py-2 cursor-pointer`}
            onClick={() => handleSendMoneyCtgChange("BENEFICIARIES")}
          >
            <IoIosHeartEmpty />
            <span>Beneficiary</span>
          </div>
          <div
            className={`${
              sendMoneyCtg.newTransfer && "bg-[#E3F6F5]"
            } flex gap-x-2 items-center  px-2 py-2 cursor-pointer`}
            onClick={() => handleSendMoneyCtgChange("NEW_TRANSFER")}
          >
            <FiPlus />
            <span>New Transfer</span>
          </div>
          <div
            className={`${
              sendMoneyCtg.scheduleTransfer && "bg-[#E3F6F5]"
            } flex gap-x-2 items-center  px-2 py-2 cursor-pointer`}
            onClick={() => handleSendMoneyCtgChange("SCHEDULE_TRANSFER")}
          >
            <IoCalendarOutline />
            <span>Scehdule Transfer</span>
          </div>
        </article>

        <article>
          <span>Exchange Rate</span>
          <TableComponent
            tableHeaders={tableHeaders}
            tableValues={tableValues}
          />
        </article>
      </section>
      {sendMoneyCtg.beneficiaries === true ? (
        <Beneficiaries />
      ) : (
        <NewTransfer />
      )}
    </main>
  );
};

export default SendMoney;
