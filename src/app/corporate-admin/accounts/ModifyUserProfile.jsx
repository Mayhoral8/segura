import React from "react";

import { Form, Formik, ErrorMessage, Field } from "formik";

import Close from "../../../assets/adminDashboard/Close.svg";
import NoteIcon from "../../../assets/adminDashboard/information.svg";

import Image from "next/image";

const ModifyUserProfile = ({
  toggleModifyUserProfileModal,
  handleToggleModifyUserProfileModal,
}) => {
  return (
    <>
      {toggleModifyUserProfileModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] fixed py-[20px] top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white h-[92vh] w-[530px] relative px-[100px] py-[40px]">
            <div
              className="absolute top-[30px] right-[30px] cursor-pointer"
              onClick={() => handleToggleModifyUserProfileModal()}
            >
              <Image src={Close} alt="back arrow" />
            </div>
            <Formik>
              <Form className="flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                      Modify User Profile
                    </h4>
                  </div>
                </div>
                <p className="text-[#787878] text-[14px] mt-1 mb-5">
                  Fill the necessary fields below with user details
                </p>

                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label
                    htmlFor="officeAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Full Name
                  </label>
                  <Field
                    name="full name"
                    type="text"
                    placeholder="Enter fullname"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="full name name" />
                  </span>
                </div>
                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label htmlFor="email" className="text-[#8C8C8C] text-sm">
                    Email Address
                  </label>
                  <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                    <Field
                      name="title"
                      type="text"
                      placeholder="puichie@gmail.com"
                      className="bg-white w-full h-full outline-none"
                    />
                  </div>
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="email" />
                  </span>
                </div>

                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label
                    htmlFor="officeAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Date of Birth
                  </label>
                  <Field
                    name="date of birth"
                    type="text"
                    placeholder="00/00/1999"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="company name" />
                  </span>
                </div>
                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label
                    htmlFor="officeAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Phone Number
                  </label>
                  <Field
                    name="phone number"
                    type="text"
                    placeholder="+234"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="company name" />
                  </span>
                </div>

                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label htmlFor="role" className="text-[#8C8C8C] text-sm">
                    Role
                  </label>
                  <Field
                    name="role"
                    as="select"
                    placeholder=""
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  >
                    <option value="">Select...</option>
                    <option value="">admin</option>
                  </Field>
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="role" />
                  </span>
                </div>
                <div className="flex flex-col w-full gap-y-2 mb-2">
                  <label
                    htmlFor="department"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Department
                  </label>
                  <Field
                    name="residential address"
                    as="select"
                    placeholder="Enter address location"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  >
                    <option value="">Select...</option>
                    <option value="">admin</option>
                  </Field>
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="department" />
                  </span>
                </div>
                <button className="h-[36px] w-[120px] rounded-[4px] bg-[#2C698D] mt-[10px] text-white text-[14px] ml-auto justify-self-end">
                  Save Changes
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifyUserProfile;
