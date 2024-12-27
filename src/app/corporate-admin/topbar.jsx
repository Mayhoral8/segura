"use client"
import React from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import Avatar from "../../avatar.png";
import { useSession } from "next-auth/react";

// media imports
import Translate from "../../assets/adminDashboard/Translation.svg";
import Notification from "../../assets/adminDashboard/notifBell.svg";

const TopBar = ({ page }) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col relative  w-full">
      <div className="lg:w-[80%] h-20 bg-white shadow-[0_4px_10px_-5px_rgba(0,0,0,0.1)] text-white fixed top-0 z-40 px-10">
        <div className="h-full w-full flex justify-between items-center">
          <div className="text-[#1F1F1F] text-[20px] font-bold">
            <p>{page}</p>
          </div>
          <div className="flex items-center gap-[50px]">
            <div className="">
              <div className="w-[400px] h-[40px] border-[#D9D9D9] border-[2px] rounded-md bg-white flex justify-between items-center pl-2">
                <CiSearch className="text-[#262626] text-[14px]" />
                <input
                  type="text"
                  className="h-full w-[95%] bg-transparent text-[#262626] outline-none placeholder:text-[#D9D9D9]"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Image src={Translate} alt="translate" />
              <Image src={Notification} alt="notifications" />
              <div className="flex items-center">
                <Image
                  src={Avatar}
                  alt=""
                  height={40}
                  width={40}
                  className="rounded-full mr-2"
                />
                <div className="text-[#262626] text-[14px]">
                  {/* {session?.user?.username} */}
                  Jones Canes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
