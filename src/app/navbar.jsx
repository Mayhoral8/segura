"use client";

import React, { useState, useContext, useReducer, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
// import logo from "../../public/navbar/logo.png";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [openNavBar, setOpenNavBar] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    console.log("dswe");
    localStorage.removeItem("authData");
    localStorage.removeItem("ResultUrl");
    router.push("/portals/login");
  };

  const initialState = {
    admissionsIsActive: false,
    aboutIsActive: false,
    contactIsActive: false,
    portalsIsActive: false,
  };
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "ADMISSIONS":
        return {
          ...state,
          admissionsIsActive: true,
          aboutIsActive: false,
          contactIsActive: false,
          portalsIsActive: false,
        };

      case "ABOUT_US":
        return {
          ...state,
          aboutIsActive: true,
          contactIsActive: false,
          admissionsIsActive: false,
          portalsIsActive: false,
        };

      case "CONTACT_US":
        return {
          ...state,
          contactIsActive: true,
          aboutIsActive: false,
          admissionsIsActive: false,
          portalsIsActive: false,
        };

      case "PORTALS":
        return {
          ...state,
          portalsIsActive: true,
          aboutIsActive: false,
          admissionsIsActive: false,
          contactIsActive: false,
        };

      case "DEFAULT":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const navBarHandler = (type) => {
    if (type === "home") {
      setOpenNavBar(false);
      return dispatch({ type: "DEFAULT" });
    } else {
      setOpenNavBar(!openNavBar);
    }

    if (type === "about") {
      return dispatch({ type: "ABOUT_US" });
    } else if (type === "admissions") {
      return dispatch({ type: "ADMISSIONS" });
    } else if (type === "portal") {
      return dispatch({ type: "PORTAL" });
    } else if (type === "contact") {
      return dispatch({ type: "CONTACT_US" });
    }
  };
  useEffect(() => {
    if (pathname === "/admissions") {
      return dispatch({ type: "ADMISSIONS" });
    } else if (pathname === "/contact") {
      return dispatch({ type: "CONTACT_US" });
    } else if (pathname === "/about_us") {
      return dispatch({ type: "ABOUT_US" });
    } else if (pathname === "/portals") {
      return dispatch({ type: "PORTAL" });
    } else if (pathname === "/") {
      return dispatch({ type: "DEFAULT" });
    }
  }, [pathname]);

  return (
    <section
      className={`${
        openNavBar ? "bg-[#2c698d]" : "bg-white"
      } xl:bg-white xl:bg-opacity-[0.05] xl:backdrop-blur-sm flex justify-center py-5 xl:h-28 lg:items-center fixed top-0 left-0 right-0 z-30 items-center`}
    >
      <div className="xl:border-2 xl:bg-opacity-50 xl:backdrop-blur-md xl:border-[#2c698d] xl:h-[60px] w-full h-full xl:w-[88%] xl:bg-white flex lg:flex-row flex-col lg:justify-between items-center lg:rounded-[20px] lg:px-2">
        <div className="px-4 xl:px-0 lg:w-max flex flex-row justify-between items-center w-full">
          <div
            className={`${
              openNavBar ? "text-white" : "text-black"
            } flex flex-row items-center lg:text-black font-bold text-2xl`}
          >
            SEGURA.
          </div>

          <div className="lg:hidden cursor-pointer text-2xl">
            {openNavBar ? (
              <CloseIcon
                onClick={() => navBarHandler("")}
                className="text-white"
              />
            ) : (
              <MenuIcon onClick={() => navBarHandler("")} />
            )}
          </div>
        </div>

        <div
          className={`${
            openNavBar ? "bg-[#2c698d] h-screen text-gray-950 " : " h-0"
          } shadow-md transition-all delay-400 duration-300 lg:h-full lg:shadow-none w-full lg:w-max lg:text-black overflow-y-scroll lg:overflow-hidden relative`}
        >
          <ul className="flex lg:px-2 items-center gap-y-8 lg:gap-y-0 justify-center  lg:text-sm flex-col lg:flex-row h-full relative text-xl lg:gap-10 font-semibold">
            <Link href="#" className="">
              <li
                className={`${
                  openNavBar ? "visible" : "hidden"
                } hover:lg:bg-[#2c698d]  hover:lg:text-white lg:block ${
                  state.aboutIsActive && "lg:bg-[#2c698d]  lg:text-gray-950 "
                } text-white lg:text-gray-900 lg:h-8 lg:w-20 lg:text-center lg:flex lg:items-center lg:justify-center transition-all delay-400 duration-300 ml-2 lg:ml-0`}
                onClick={() => navBarHandler("about")}
              >
                About Us
              </li>
            </Link>
            <Link href="#">
              <div
                className={`${openNavBar ? "visible" : "hidden"}  lg:block ${
                  state.portalsIsActive && "lg:bg-[#2c698d]  lg:text-gray-950 "
                } text-white lg:text-gray-900 lg:h-8 lg:w-20 lg:text-center lg:flex lg:items-center lg:justify-center transition-all delay-400 duration-300 cursor-pointer flex flex-row items-center justify-between`}
                onClick={() => navBarHandler("portal")}
              >
                Products
              </div>
            </Link>

            <Link href="#" className="">
              <li
                className={`${
                  openNavBar ? "visible" : "hidden"
                } hover:lg:bg-[#2c698d]  hover:lg:text-white lg:block ${
                  state.admissionsIsActive &&
                  "lg:bg-[#2c698d]  lg:text-gray-950"
                } lg:text-gray-900 text-white lg:h-8 lg:w-20 lg:text-center lg:flex lg:items-center lg:justify-center transition-all delay-400 duration-300`}
                onClick={() => navBarHandler("admissions")}
              >
                Company
              </li>
            </Link>

            <Link href="#" className="">
              <li
                className={`${
                  openNavBar ? "visible" : "hidden"
                } hover:lg:bg-[#2c698d]  hover:lg:text-white lg:block ${
                  state.contactIsActive && "lg:bg-[#2c698d]  lg:text-gray-950"
                } lg:text-gray-900 text-white lg:h-8 lg:w-20 lg:text-center lg:flex lg:items-center lg:justify-center transition-all delay-400 duration-300 relative`}
                onClick={() => navBarHandler("contact")}
              >
                Resources
              </li>
            </Link>

            <li
              className={`${openNavBar ? "visible" : "hidden"} ${
                pathname === "/portals/result" ? "visible" : "hidden lg:hidden"
              } hover:lg:bg-[#2c698d]  hover:lg:text-white  lg:text-gray-900 text-white lg:h-8 lg:w-20 lg:text-center lg:flex lg:items-center lg:justify-center transition-all delay-400 duration-300 relative cursor-pointer`}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex flex-row gap-x-2">
          <Link href="/auth/login">
            <button className="border-[#2c698d] text-[#2c698d] tracking-[0.5px] font-semibold border-2 hover:bg-[#2c698d] hover:text-white lg:px-3 xl:px-0 xl:w-[140px] h-[40px] rounded-[10px] ">
              Login
            </button>
          </Link>
          <button className="bg-[#2c698d] lg:px-3 xl:px-0 xl:w-[140px] h-[40px] rounded-[10px] tracking-[0.5px] font-semibold text-white">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
