import React from "react";
import { Avatar } from "@mui/material";
// import { PiPencilLineThin } from "react-icons/pi";

const page = () => {
  return (
    <main className="px-10">
      <section>
        <article className="flex items-center border rounded-md px-4 py-4 gap-x-2">
          <Avatar src="#" />
          <div>
            <span className="text-lg font-semibold">ABC Company</span>
          </div>
        </article>
      </section>
      <section className="mt-10 text-base px-2 border rounded-md flex flex-col gap-y-4 py-2">
        <article className="flex flex-center  gap-x-10 w-[60%]">
          <div className="flex flex-col  gap-x-2 w-1/2 gap-y-1">
            <span className="font-light">First Name</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">John Doe</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
          <div className="flex flex-col gap-x-2  w-1/2 gap-y-1">
            <span className="font-light">Last Name</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">Roberts</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
        </article>
        <article className="flex flex-center  gap-x-10 w-[60%]">
          <div className="flex flex-col  gap-x-2 w-1/2 gap-y-1">
            <span className="font-light">Email</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">john.doe@example.com</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
          <div className="flex flex-col gap-x-2  w-1/2 gap-y-1">
            <span className="font-light">Phone Number</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">+23409876624</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
        </article>
      </section>
      <section className="mt-10 text-base px-2 border rounded-md flex flex-col gap-y-4 py-2">
        <article className="flex flex-center  gap-x-10 w-[60%]">
          <div className="flex flex-col  gap-x-2 w-1/2 gap-y-1">
            <span className="font-light">Date of Birth</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">1990-10-01</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
          <div className="flex flex-col gap-x-2  w-1/2 gap-y-1">
            <span className="font-light">Country</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">Nigeria</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
        </article>
        <article className="flex flex-center  gap-x-10 w-[60%]">
          <div className="flex flex-col  gap-x-2 w-1/2 gap-y-1">
            <span className="font-light">Address</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">Ikeja, Lagos</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
          <div className="flex flex-col gap-x-2  w-1/2 gap-y-1">
            <span className="font-light">BVN</span>
            <div className=" border rounded-md  px-1 flex justify-between items-center bg-[#efefef] h-10 ">
              <span className=" ">2399991993</span>

              {/* <PiPencilLineThin /> */}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default page;
