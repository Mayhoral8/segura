"use client"
import React from 'react'
import Image from 'next/image'
// import { CiSearch } from 'react-icons/ci'
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { MdOutlineMail } from "react-icons/md";
import { useSession } from "next-auth/react";
import Avatar from "../../avatar.png";

const TopBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col lg:w-[84%] relative lg:left-[16%]">
    <div className="lg:w-[84%] h-20 bg-white shadow-[0_4px_10px_-5px_rgba(0,0,0,0.1)] text-white fixed top-0 z-40 px-10">
      <div className="h-full w-full flex justify-between items-center">
        <div className="">
          <div className="w-[200px] h-[40px] border-[2px] rounded-md bg-white flex justify-between items-center pl-2">
            {/* <CiSearch className="text-[#2C698D]" /> */}
            <input
              type="text"
              className="h-full w-[85%] bg-transparent text-[#2C698D] outline-none placeholder:text-[#2C698D]"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          {/* <IoIosNotificationsOutline className="text-[#2C698D]" /> */}
          {/* <MdOutlineMail className="text-[#2C698D]" /> */}
          <div className="flex items-center">
            <Image
              src={Avatar}
              alt=""
              height={40}
              width={40}
              className="rounded-full mr-2"
            />
            <div className="text-[#2C698D] text-lg font-semibold">
              {session?.user?.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TopBar