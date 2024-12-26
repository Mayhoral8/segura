import React from "react";
import { Avatar } from "@mui/material";
import { BsPlusCircleFill } from "react-icons/bs";
import AvatarImg from "../../../../../avatar.png"

const Beneficiaries = () => {
  return (
    <main className="w-[60%] border-l h-full flex flex-col justify-center px-8 py-4 mt-4 ">
      <span className="font-bold">Beneficiaries</span>
      <section className="flex flex-wrap gap-x-1 gap-y-1 mt-4">
        <div className="flex flex-col items-center justify-center h-[76px] w-[100px] bg-[#F0F0F0] rounded-md">
          <BsPlusCircleFill className="text-[#2C698D] text-2xl" />
          <span>Add New</span>
        </div>

        <article className="border shadow-md w-[200px] rounded-md flex items-center h-[76px] justify-center gap-x-2">
          <Avatar
          src={AvatarImg.src}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm">Daniel Olay Mba</span>
            <span className="text-xs">6756773882</span>
          </div>
        </article>
        <article className="border shadow-md w-[200px] rounded-md flex items-center h-[76px] justify-center gap-x-2">
          <Avatar
            src={AvatarImg.src}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm">Daniel Olay Mba</span>
            <span className="text-xs">6756773882</span>
          </div>
        </article>
        <article className="border shadow-md w-[200px] rounded-md flex items-center h-[76px] justify-center gap-x-2">
          <Avatar
            src={AvatarImg.src}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm">Daniel Olay Mba</span>
            <span className="text-xs">6756773882</span>
          </div>
        </article>
        <article className="border shadow-md w-[200px] rounded-md flex items-center h-[76px] justify-center gap-x-2">
          <Avatar
            src={AvatarImg.src}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm">Daniel Olay Mba</span>
            <span className="text-xs">6756773882</span>
          </div>
        </article>
        <div className="h-[76px] flex items-center justify-center w-[100px]">
          <span className=" underline text-[#2C698D]">View all</span>
        </div>
      </section>
    </main>
  );
};

export default Beneficiaries;
