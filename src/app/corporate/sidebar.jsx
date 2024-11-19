import React, { useEffect, useReducer, useContext, useState } from "react";
import Link from "next/link";
import { ConfigContext } from "@/contexts/ConfigContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { MdInsertChart } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { RiFileList2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";

const Sidebar = () => {
  const { setShowSignOutModal, check } = useContext(ConfigContext);
  const handleSignOut = () => {
    check();
    setShowSignOutModal(true);
  };

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
    if (pathname === "/corporate/" || "/corporate/dashboard") {
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
  const [showDropdown, setShowDropDown] = useState(false);

  const handleDropDown = () => {
    setShowDropDown(!showDropdown);
  };
  return (
    <section className="hidden lg:flex bg-white text-gray-600 border-solid mt-10 fixed z-30 lg:h-full shadow-md  flex-col text-3xl h-20 bottom-0  w-full lg:w-[16%]  lg:px-4 ">
      <div className="flex-row items-center gap-x-1 lg:flex hidden">
        <p className="font-semibold text-base text-primary-500">SEGURA</p>
      </div>
      <article className="lg:h-[70%] lg:items-start flex flex-row lg:flex-col justify-start my-8 items-center h-full w-full border-b">
        <section className="flex flex-row lg:flex-col justify-evenly lg:gap-y-4 w-full lg:mt-4 overflow-y-auto">
          <Link
            href="/corporate/dashboard"
            onClick={() => handleDispatch("DASHBOARD")}
            className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center ${
              state.dashboard.isActive && "bg-[#2c698d] text-white"
            } `}
          >
            <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center  ">
              <MdDashboard className="text-lg " />
              <span className="">Dashboard</span>
            </div>
          </Link>
          <Link
            href="/corporate/verify"
            onClick={() => handleDispatch("VERIFY")}
            className={`w-full g:h-8 flex items-center lg:rounded-md lg:px-2 justify-center ${
              state.verify.isActive && "bg-[#2c698d] text-white"
            } `}
          >
            <div className="flex flex-col w-full  text-[12px] gap-x-1 lg:flex-row items-center">
              <MdInsertChart className="text-lg" />
              <span className="">Verify</span>
            </div>
          </Link>
          <Link
            href="/corporate/manage-users"
            onClick={() => handleDispatch("MANAGE_USERS")}
            className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center ${
              state.manageUsers.isActive && "bg-[#2c698d] text-white"
            } `}
          >
            <div className=" w-full flex flex-col  text-[12px] gap-x-1 lg:flex-row  items-center">
              <BiSolidUserRectangle className="text-lg" />
              <span className="">Manage users</span>
            </div>
          </Link>
          <Link
            href="corporate-manage-billers"
            onClick={() => handleDispatch("JOBS")}
            className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center ${
              state.jobs.isActive &&
              "text-PrimaryPurple lg:text-white lg:bg-PrimaryPurple"
            } `}
          >
            <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center">
              <RiFileList2Fill className="text-lg" />
              <span className="">Settings</span>
            </div>
          </Link>
          <article className="w-full flex items-center lg:rounded-md lg:px-2 justify-center flex-col ">
            <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center">
              <MdDashboard className="text-lg " />
              <span onClick={handleDropDown} className="">
                Dropdown
              </span>
            </div>
            <article
              className={`flex flex-col ${
                showDropdown ? "h-auto" : "h-0 hidden"
              }  transition-all text-[12px] w-full pl-5   text-red-500 `}
            >
              <div>name</div>
              <div>age</div>
              <div>name</div>
              <div>age</div>
            </article>
          </article>
          <article className="w-full flex items-center lg:rounded-md lg:px-2 justify-center flex-col  ">
            <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center">
              <MdDashboard className="text-lg " />
              <span onClick={handleDropDown} className="">
                Dropdown
              </span>
            </div>
            <article
              className={`flex flex-col ${
                showDropdown ? "h-auto" : "h-0 hidden"
              } text-[12px] transition-all w-full pl-5   text-red-500 `}
            >
              <div>name</div>
              <div>age</div>
              <div>name</div>
              <div>age</div>
            </article>
          </article>
        </section>
      </article>
      <article className="lg:block hidden  mt-auto py-2">
        <div className="hover:lg:bg-PrimaryPurple cursor-pointer rounded-md h-8 px-2 flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
          {/* <img src={profile.src} className="h-10 w-10"/> */}
          <span className="text-xs ">
            ABC Company <br />
            corporate{" "}
          </span>
          <GoSignOut className="text-lg" onClick={handleSignOut} />
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
