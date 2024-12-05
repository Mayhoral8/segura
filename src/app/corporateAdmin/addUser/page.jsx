import { Checkbox } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <div className="px-10 py-5">
      <h2 className="text-2xl font-semibold">Add new users</h2>
      <form
        action=""
        className="my-6 py-10 px-10 border-2 border-[#2C698D1A] border-dashed bg-white"
      >
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Corporate Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Corporate Address
          </label>
          <input
            type="text"
            placeholder="Last name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Corporate Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Corporate Phone Number
          </label>
          <input
            type="number"
            placeholder="Phone number"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Corporate Registration Number
          </label>
          <input
            type="number"
            placeholder="Phone number"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>

        <div className="">
          <h3 className="font-semibold text-lg">User Permissions</h3>
          <div className="">
            <div className="flex flex-row justify-between w-full items-center mt-4">
              <span>Permissions</span>
              <div className="flex flex-row gap-x-4">
                <span>Select</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-4 ">
              <div className="flex flex-col w-full  bg-white">
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          color: "#2c698d",
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Account
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Wallets
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Transaction
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button className="bg-[#2C698D] text-white py-2 px-4 rounded-md flex items-center">
        <span className="text-2xl mr-2">+</span> Add User
      </button>
    </div>
  );
};

export default page;
