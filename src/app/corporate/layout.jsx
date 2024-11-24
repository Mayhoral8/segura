"use client";

import React, { useReducer, useEffect, useState, useContext } from "react";

import { MdDashboard } from "react-icons/md";
import { MdInsertChart } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { RiFileList2Fill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { FaCircleXmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConfigContext } from "@/contexts/ConfigContext";


import SignOutModal from "@/app/auth/signoutModal";

import TopBar from "@/app/corporate/topbar";
import { CiWallet } from "react-icons/ci";

import AuthGuard from "@/app/auth/AuthGuard";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const { setShowSignOutModal } = useContext(ConfigContext);

  const handleSignOutModal = () => {
    setShowSignOutModal(true);
  };

  const pathname = usePathname();

  const initialState = {
    dashboard: {
      isActive: true,
    },
    verify: {
      isActive: false,
    },
    manageUsers: {
      isActive: false,
    },
    accounts: {
      isActive: false,
    },
    wallets: {
      isActive: false,
    },
  };
  const [showDropdown, setShowDropDown] = useState(false);

  const handleDropDown = () => {
    setShowDropDown(!showDropdown);
  };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "DASHBOARD": {
        return {
          ...state,
          dashboard: { isActive: true },
          verify: { isActive: false },
          manageUsers: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "VERIFY": {
        return {
          ...state,
          dashboard: { isActive: false },
          verify: { isActive: true },
          manageUsers: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "MANAGE_USERS": {
        return {
          ...state,
          dashboard: { isActive: false },
          verify: { isActive: false },
          manageUsers: { isActive: true },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "ACCOUNTS": {
        return {
          ...state,
          dashboard: { isActive: false },
          verify: { isActive: false },
          manageUsers: { isActive: false },
          accounts: { isActive: true },
          wallets: { isActive: false },
        };
      }
      case "WALLETS": {
        return {
          ...state,
          dashboard: { isActive: false },
          verify: { isActive: false },
          manageUsers: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: true },
        };
      }
      default:
        return state;
    }
  };

  useEffect(() => {
    if (pathname === "/corporate/dashboard") {
      return dispatch({ type: "DASHBOARD" });
    } else if (pathname === "/corporate/verify") {
      return dispatch({ type: "VERIFY" });
    } else if (pathname === "/corporate/manage-users") {
      return dispatch({ type: "MANAGE_USERS" });
    } else if (pathname.includes("/corporate/accounts")) {
      return dispatch({ type: "ACCOUNTS" });
    } else if (pathname.includes("/corporate/wallets")) {
      return dispatch({ type: "WALLETS" });
    }
  }, [pathname]);
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleDispatch = (type) => {
    dispatch({ type });
  };
  return (
    // <AuthGuard>
    <main className="w-screen">
      <SignOutModal />
      <TopBar />
      <section className="hidden lg:flex bg-white text-gray-600 border-solid mt-10 fixed z-30 lg:h-full shadow-md flex-col text-3xl h-20 bottom-0  w-full lg:w-[16%] lg:px-4 ">
        <article className="lg:h-[70%] lg:items-start flex flex-row lg:flex-col justify-start my-8 items-center h-full w-full">
          <div className="flex-row items-center gap-x-1 lg:flex hidden">
            <p className="font-semibold text-base text-primary-500">SEGURA</p>
          </div>
          <section className="flex flex-row lg:flex-col justify-evenly lg:gap-y-4 w-full lg:mt-4">
            <Link
              href="/corporate/dashboard"
              onClick={() => handleDispatch("DASHBOARD")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.dashboard.isActive && "bg-[#2c698d] text-white"
              } `}
            >
              <div className="flex flex-col w-full lg:text-sm text-[12px] gap-x-1 lg:flex-row items-center  ">
                <MdDashboard className="text-lg " />
                <span className="">Dashboard</span>
              </div>
            </Link>
            <Link
              href="/corporate/accounts"
              onClick={() => handleDispatch("ACCOUNTS")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.accounts.isActive && "bg-[#2c698d] text-white"
              } `}
            >
              <div className="flex flex-col w-full lg:text-sm text-[12px] gap-x-1 lg:flex-row items-center">
                <RiFileList2Fill className="text-lg" />
                <span className="">Accounts</span>
              </div>
            </Link>
            <Link
              href="/corporate/wallets"
              onClick={() => handleDispatch("WALLETS")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.wallets.isActive && "bg-[#2c698d] text-white"
              } `}
            >
              <div className="flex flex-col w-full lg:text-sm text-[12px] gap-x-1 lg:flex-row items-center">
                <CiWallet className="text-lg" />
                <span className="">Wallets</span>
              </div>
            </Link>
            <Link
              href="/corporate/verify"
              onClick={() => handleDispatch("VERIFY")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.verify.isActive && "bg-[#2c698d] text-white"
              } `}
            >
              <div className="flex flex-col w-full lg:text-sm text-[12px] gap-x-1 lg:flex-row items-center">
                <MdInsertChart className="text-lg" />
                <span className="">Verify</span>
              </div>
            </Link>
            <Link
              href="/corporate/manage-users"
              onClick={() => handleDispatch("MANAGE_USERS")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.manageUsers.isActive && "bg-[#2c698d] text-white"
              } `}
            >
              <div className=" w-full flex flex-col lg:text-sm text-[12px] gap-x-1 lg:flex-row  items-center">
                <BiSolidUserRectangle className="text-lg" />
                <span className="">Manage users</span>
              </div>
            </Link>
          </section>
        </article>
        <article className=" h-[20%] lg:flex hidden border-t flex-col justify-evenly py-2">
          <div className="text-xs flex flex-row gap-x-2">
            <span className="font-light">Status:</span>
            <div className="flex items-center gap-x-1">
            <span>Unverified</span>
            <FaCircleXmark className="text-red-400"/>
            </div>
          </div>
          <div className="hover:lg:bg-PrimaryPurple cursor-pointer rounded-md h-8  flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center justify-between">
            <span className="text-xs ">
              ABC Company <br />
              corporate{" "}
            </span>
            <GoSignOut onClick={handleSignOutModal} className="text-lg" />
          </div>
        </article>
      </section>
      <div className="mt-24 ml-[16%]">{children}</div>
    </main>
    // </AuthGuard>
  );
}
