"use client";
import React, { useState, useReducer } from "react";
import { FiSend } from "react-icons/fi";
import { Avatar } from "@mui/material";
import { FaEuroSign, FaPoundSign } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
import { TbCurrencyPound } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { HiSwitchHorizontal } from "react-icons/hi";

type State = {
  dollar: {
    isActive: boolean;
  };
  euro: {
    isActive: boolean;
  };
  pounds: {
    isActive: boolean;
  };
  naira: {
    isActive: boolean;
  };
};
type Action = {
  type: string;
};
const Page = () => {
  const [showWallets, setShowWallets] = useState<boolean>(false);

  const handleShowWallets = () => {
    setShowWallets(!showWallets);
  };

  const initialState = {
    dollar: {
      isActive: true,
    },
    euro: {
      isActive: false,
    },
    pounds: {
      isActive: false,
    },
    naira: {
      isActive: false,
    },
  };

  const reducerFunc = (state: State, action: Action) => {
    switch (action.type) {
      case "DOLLAR": {
        return {
          ...state,
          dollar: { isActive: true },
          euro: { isActive: false },
          pounds: { isActive: false },
          naira: { isActive: false },
        };
      }
      case "EURO": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: true },
          pounds: { isActive: false },
          naira: { isActive: false },
        };
      }
      case "POUNDS": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: false },
          pounds: { isActive: true },
          naira: { isActive: false },
        };
      }
      case "NAIRA": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: false },
          pounds: { isActive: false },
          naira: { isActive: true },
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleDispatch = (type: string) => {
    dispatch({ type });
  };

  // const
  return (
    <main className="px-10">
      <article className=" rounded-md flex flex-row gap-x-4">
        <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
          <span>Send Money</span>
          <FiSend />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
          <span>Add Funds</span>
          <FiSend />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
          <span>Convert Funds</span>
          <FiSend />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
          <span>Send Money</span>
          <FiSend />
        </div>
      </article>
      <section className="mt-4 flex flex-row w-full border gap-x-4">
        <article className="bg-white border h-72 w-64 px-4 py-4 flex flex-col justify-between">
          <div
            className="flex flex-row border rounded-lg items-center cursor-pointer gap-x-2"
            onClick={handleShowWallets}
          >
            <Avatar
              src={`${
                state.dollar.isActive
                  ? "https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740"
                  : state.euro.isActive
                  ? "https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
                  : state.pounds.isActive
                  ? "https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
                  : "https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740"
              }`}
            />
            <span>
              {state.dollar.isActive
                ? "US Dollar"
                : state.euro.isActive
                ? "Euro"
                : state.pounds.isActive
                ? "British Pound"
                : "Nigeria Naira"}
            </span>

            <span>Switch</span>
            <HiSwitchHorizontal />
          </div>

          <article
            className={`${
              showWallets ? "flex h-[161px]" : "hidden h-0"
            } absolute border mt-12 text-sm flex-col rounded-md w-[222px] bg-white  transition-transform shadow-sm z-10`}
          >
            <div
              className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer"
              onClick={() => {
                handleDispatch("DOLLAR"), handleShowWallets();
              }}
            >
              <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
              <span>Us Dollar ($)</span>
            </div>
            <div
              className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer"
              onClick={() => {
                handleDispatch("EURO"), handleShowWallets();
              }}
            >
              <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
              <span>British Pound</span>
              (<TbCurrencyPound /> )
            </div>
            <div
              className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer"
              onClick={() => {
                handleDispatch("POUNDS"), handleShowWallets();
              }}
            >
              <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
              <span>Euro</span>
              (<FaEuroSign />)
            </div>
            <div
              className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer"
              onClick={() => {
                handleDispatch("NAIRA"), handleShowWallets();
              }}
            >
              <Avatar src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740" />
              <span>Nigeria Naira</span>
              (<FaNairaSign />)
            </div>
          </article>
          <div className="flex flex-col">
            <div className="flex flex-row items-center mt-4 gap-x-2">
              <div className="flex flex-row text-2xl items-center ">
                {state.dollar.isActive ? (
                  "$"
                ) : state.euro.isActive ? (
                  <FaEuroSign />
                ) : state.pounds.isActive ? (
                  <FaPoundSign />
                ) : (
                  <FaNairaSign />
                )}
                <span>0.00</span>
              </div>
              <IoEyeOutline />
            </div>
            <h2>Available Balance</h2>
          </div>

          <div>
            <button className="border bg-[#2c698d] text-white py2 px-2 rounded-sm">
              Generate Account Statement
            </button>
          </div>
        </article>
        <article className="bg-white border h-72 w-64 px-4 py-4 flex flex-col gap-y-4">
          <h2>Receiving Account</h2>
          {state.dollar.isActive ? (
            <div className="">
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-x-4">
                  <span className="text-gray-950">John Doe Robert </span>
                  <FaRegCopy />
                </div>
                <span className="text-gray-400">Account Holder</span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-x-4">
                  <span className="text-gray-950">Wells Fargo</span>
                  <FaRegCopy />
                </div>
                <span className="text-gray-400">Bank Name</span>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-x-4">
                  <span className="text-gray-950">40630269950327378 </span>
                  <FaRegCopy />
                </div>
                <span className="text-gray-400">Account Number</span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-x-4">
                  <span className="text-gray-950">121000248</span>
                  <FaRegCopy />
                </div>
                <span className="text-gray-400">Routing Number</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between items-center h-full">
              <span className="text-lg font-semibold">No Bank Details Yet</span>
              <p className="text-center font-light">
                Receive money from people and businesses with your account
                details
              </p>
              <button className="border px-2 py-2 bg-[#2c698d] text-white rounded-md">
                Request funding account
              </button>
            </div>
          )}
        </article>
        <article className="bg-white border h-72 w-64">a</article>
      </section>

      <section className="mt-4">Transactions History</section>
    </main>
  );
};

export default Page;
