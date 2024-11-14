"use client";

import React, { useReducer, useEffect, useContext } from "react";
// import { CreateContext } from "../../Context/Context";
import { MdDashboard } from "react-icons/md";
import { MdInsertChart } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { RiFileList2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
// import { Link, useLocation, useNavigate } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go";
// import logo from "@/assets/logo.png";
// import profile from "@/assets/Profile.png"

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";

import Avatar from "../../avatar.png";
// if (userRole === "Employer") {

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const navigate = useRouter();
  // const { logout, userRole } = useContext(CreateContext).auth;
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
    jobs: {
      isActive: false,
    },
    credentials: {
      isActive: false,
    },
  };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "DASHBOARD": {
        return {
          ...state,
          dashboard: { isActive: true },
          reports: { isActive: false },
          manageUsers: { isActive: false },
          jobs: { isActive: false },
          credentials: { isActive: false },
        };
      }
      case "VERIFY": {
        return {
          ...state,
          dashboard: { isActive: false },
          verify: { isActive: true },
          manageUsers: { isActive: false },
          jobs: { isActive: false },
          credentials: { isActive: false },
        };
      }
      case "LIVE_SESSIONS": {
        return {
          ...state,
          dashboard: { isActive: false },
          reports: { isActive: false },
          manageUsers: { isActive: true },
          jobs: { isActive: false },
          credentials: { isActive: false },
        };
      }
      case "JOBS": {
        return {
          ...state,
          dashboard: { isActive: false },
          reports: { isActive: false },
          manageUsers: { isActive: false },
          jobs: { isActive: true },
          credentials: { isActive: false },
        };
      }
      case "CREDENTIALS": {
        return {
          ...state,
          dashboard: { isActive: false },
          reports: { isActive: false },
          manageUsers: { isActive: false },
          jobs: { isActive: false },
          credentials: { isActive: true },
        };
      }
      default:
        return state;
    }
  };

  useEffect(() => {
    if (pathname === "/corporate/") {
      return dispatch({ type: "DASHBOARD" });
    } else if (pathname === "/corporate/verify") {
      return dispatch({ type: "VERIFY" });
    } else if (pathname === "/corporate/manage-users") {
      return dispatch({ type: "LIVE_SESSIONS" });
    } else if (pathname === "/corporate/manage-billers/create-jobs") {
      return dispatch({ type: "JOBS" });
    } else if (pathname === "/app/recruiter/credentials") {
      return dispatch({ type: "CREDENTIALS" });
    }
  }, [pathname]);
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleDispatch = (type) => {
    dispatch({ type });
  };
  return (
    <main className="w-screen">
      <section className="hidden lg:flex bg-white text-gray-600 border-solid mt-10 fixed z-30 lg:h-full shadow-md flex-col text-3xl h-20 bottom-0  w-full lg:w-[16%] lg:px-4 ">
        <article className="lg:h-[70%] lg:items-start flex flex-row lg:flex-col justify-start my-8 items-center h-full w-full border-b">
          <div className="flex-row items-center gap-x-1 lg:flex hidden">
            {/* <img alt="GroPay" src={logo.src} className="h-11 w-auto" /> */}
            <p className="font-semibold text-base text-primary-500">SEGURA</p>
          </div>
          <section className="flex flex-row lg:flex-col justify-evenly lg:gap-y-4 w-full lg:mt-4">
            <Link
              href="/corporate"
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

            <Link
              href="corporate-manage-billers"
              onClick={() => handleDispatch("JOBS")}
              className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
                state.jobs.isActive &&
                "text-PrimaryPurple lg:text-white lg:bg-PrimaryPurple"
              } `}
            >
              <div className="flex flex-col w-full lg:text-sm text-[12px] gap-x-1 lg:flex-row items-center">
                <RiFileList2Fill className="text-lg" />
                <span className="">Settings</span>
              </div>
            </Link>
          </section>
          {/* <Link
          onClick={() => handleDispatch("CREDENTIALS")}
          className={`w-full lg:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
            state.credentials.isActive &&
            "text-PrimaryPurple lg:text-white lg:bg-PrimaryPurple"
          } `}
        >
          <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
            <PiCertificateLight className="text-lg" />
            <span className="">Credentials</span>
          </div>
        </Link> */}
        </article>
        <article className="lg:block hidden  mt-auto py-2">
          <div className="hover:lg:bg-PrimaryPurple cursor-pointer rounded-md h-8 px-2 flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
            {/* <img src={profile.src} className="h-10 w-10"/> */}
            <span className="text-xs ">
              ABC Company <br />
              corporate{" "}
            </span>
            <GoSignOut className="text-lg" />
          </div>
        </article>
      </section>
      <div className="flex flex-col lg:w-[84%] relative lg:left-[16%]">
        <div className="lg:w-[84%] h-20 bg-white shadow-[0_4px_10px_-5px_rgba(0,0,0,0.1)] text-white fixed top-0 z-50 px-10">
          <div className="h-full w-full flex justify-between items-center">
            <div className="">
              <div className="w-[200px] h-[40px] border-[2px] bg-[#2C698D7A] rounded-md border-[#2C698D] flex justify-between items-center pl-2">
                <SearchIcon className="text-[#2C698D]" />
                <input
                  type="text"
                  className="h-full w-[85%] bg-transparent text-[#2C698D] outline-none placeholder:text-[#2C698D]"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <NotificationsIcon className="text-[#2C698D]" />
              <EmailIcon className="text-[#2C698D]" />
              <div className="flex items-center">
                <Image
                  src={Avatar}
                  alt=""
                  height={40}
                  width={40}
                  className="rounded-full mr-2"
                />
                <div className="text-[#2C698D] text-lg font-semibold">
                  JWT User
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative top-20">{children}</div>
      </div>
    </main>
  );
}
