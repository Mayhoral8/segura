"use client";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const Page = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    officeAddress: "",
    department: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const form = {
      ...formData,
      permissionLists: ["PERMISSION_ACCOUNT_CREATE", "PERMISSION_ACCOUNT_VIEW"], // Example for permissions
    };

    const registerUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/registerCorporateUser`,
          {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          toast.success("User creation successful")
          console.log(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    registerUser();
  };

  console.log(formData);

  return (
    <div className="px-10 py-5">
      <h2 className="text-2xl font-semibold">Add new users</h2>
      <form
        onSubmit={handleSubmit}
        action=""
        className="my-6 py-10 px-10 border-2 border-[#2C698D1A] border-dashed bg-white"
      >
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            Username
          </label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="First Name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            email
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Last name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Email"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            confirm password
          </label>
          <input
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            first name
          </label>
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="first name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            last name
          </label>
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="last name"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            officeAddress
          </label>
          <input
            onChange={handleChange}
            name="officeAddress"
            type="text"
            placeholder="Phone number"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            department
          </label>
          <input
            onChange={handleChange}
            name="department"
            type="text"
            placeholder="department"
            className="h-10 px-3 border-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-medium">
            phone number
          </label>
          <input
            onChange={handleChange}
            name="phoneNumber"
            type="text"
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
                  </article>
                </article>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#2C698D] text-white py-2 px-4 rounded-md flex items-center"
        >
          <span className="text-2xl mr-2">+</span> Add User
        </button>
      </form>
    </div>
  );
};

export default Page;
