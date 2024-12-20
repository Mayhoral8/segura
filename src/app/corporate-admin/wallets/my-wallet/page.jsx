import React from 'react'
import { Avatar } from '@mui/material'
import { FaEuroSign, FaPoundSign } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
// import TableComponent from "../../../components/Table";
import TableComponent from "../../../../components/Table"
import { AiOutlineExport } from "react-icons/ai";
import {Checkbox} from "@mui/material";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const MyWallet = () => {
  const tableHeaders = [
    "Id",
    "Customer Name",
    "Amount",
    "Payment Type",
    "Status",
    "Date & Time",
  ];

  const tableValues = [
    {
      txnId: "#790957",
      name: "Olakunle Gray",
      amount: "3000",
      paymentType: "Net Banking",
      status: "Success",
      dateAndTime: "01-06-2024 9:20 AM",
    },
    {
      txnId: "#790957",
      name: "Olakunle Gray",
      amount: "3000",
      paymentType: "Credit Card",
      status: "Failed",
      dateAndTime: "01-06-2024 9:20 AM",
    },
    {
      txnId: "#790957",
      name: "Olakunle Gray",
      amount: "3000",
      paymentType: "Net Banking",
      status: "Success",
      dateAndTime: "01-06-2024 9:20 AM",
    },
    {
      txnId: "#790957",
      name: "Olakunle Gray",
      amount: "3000",
      paymentType: "UPI",
      status: "Success",
      dateAndTime: "01-06-2024 9:20 AM",
    },
    {
      txnId: "#790957",
      name: "Olakunle Gray",
      amount: "3000",
      paymentType: "Net Banking",
      status: "Success",
      dateAndTime: "01-06-2024 9:20 AM",
    },
  ];
  return (
    <div>
       <section className="mt-4 w-full h-40 bg-white px-2 py-2 flex items-center  gap-x-2">
        <article className="bg-[#272643] h-[90%] w-[32%] rounded-md  py-4 text-white px-4 flex flex-col justify-center gap-y-1">
          <div className="text-xs flex items-center gap-x-2">
            <Avatar
              src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740"
              className="w-2 h-2"
            />
            <h2>Wallet Balance</h2>
          </div>
          <div className="flex items-center text-3xl">
            <FaNairaSign />
            <span className="">1,000,000</span>
            <span className="text-sm">.00</span>
          </div>
          <div>
            <span className="text-xs font-light">Account No: 656888986</span>
          </div>
        </article>
        <article className="bg-[#272643] h-[90%] w-[32%] rounded-md  py-4 text-white px-4 flex flex-col justify-center gap-y-1">
          <div className="text-xs flex items-center gap-x-2">
            <Avatar
              src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740"
              className="w-2 h-2"
            />
            <h2>Wallet Balance</h2>
          </div>
          <div className="flex items-center text-3xl">
            <span>$</span>
            <span className="">645</span>
            <span className="text-sm">.69</span>
          </div>
          <div>
            <span className="text-xs font-light">Account No: 656888986</span>
          </div>
        </article>
        <article className="bg-[#272643] h-[90%] w-[32%] rounded-md  py-4 text-white px-4 flex flex-col justify-center gap-y-1">
          <div className="text-xs flex items-center gap-x-2">
            <Avatar
              src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
              className="w-2 h-2"
            />
            <h2>Wallet Balance</h2>
          </div>
          <div className="flex items-center text-3xl">
            <FaPoundSign />
            <span className="">645</span>
            <span className="text-sm">.69</span>
          </div>
          <div>
            <span className="text-xs font-light">Account No: 656888986</span>
          </div>
        </article>
      </section>
      <section className=" mt-4 ">
        <article className="h-10 bg-white flex justify-between px-2 items-center text-sm">
          <h2>Transactions</h2>
          <article className="flex gap-x-4 items-center">
            <div className="flex items-center">
              <Checkbox/>
              <span>Mark all</span>
            </div>
            <div className="bg-[#096DD9] text-white py-1 px-1 rounded-sm cursor-pointer flex items-center gap-x-2 h-[80%] ">
              <AiOutlineExport />
              <h2>Export</h2>
            </div>
          </article>
        </article>

        <TableComponent tableHeaders={tableHeaders} tableValues={tableValues} />
        <article className="h-10 bg-white mt-4 px-2 flex items-center text-sm text-[#8C8C8C] justify-between">
          <span>Page 1 of 6</span>
          <div className="grid items-center grid-cols-6">
            <RxCaretLeft className="border"/>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <RxCaretRight className="border"/>
          </div>
        </article>
      </section>
    </div>
  )
}

export default MyWallet