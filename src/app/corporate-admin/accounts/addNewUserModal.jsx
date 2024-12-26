import React from "react";

import { Form, Formik, ErrorMessage, Field } from "formik";

import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import NoteIcon from "../../../assets/adminDashboard/information.svg";

import Image from "next/image";

const AddNewUserModal = ({ toggleNewUserModal, handleToggleNewUserModal }) => {
  return (
    <>
      {toggleNewUserModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] py-[20px] bottom-0 right-0 fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white h-[90vh] w-[784px] relative px-[100px] py-[50px]">
            <div
              className="absolute left-[50px] cursor-pointer"
              onClick={() => handleToggleNewUserModal()}
            >
              <Image src={BackArrow} alt="back arrow" />
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                  Add New User
                </h4>
              </div>
              <button className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white text-[14px]">
                Add User
              </button>
            </div>
            <p className="text-[#787878] text-[14px] mt-1 mb-5">
              Fill the necessary fields below with user details
            </p>
            <Formik>
              <Form className="flex flex-col h-[320px] overflow-y-auto scroll-smooth scrollbar-hide">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
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
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label htmlFor="email" className="text-[#8C8C8C] text-sm">
                      Email Address
                    </label>
                    <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                      <Field
                        name="title"
                        type="text"
                        className="bg-white w-full h-full outline-none"
                      />
                    </div>
                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
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
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
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
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
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
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
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
                </div>
                <div className="">
                  <h4 className="text-[#787878] text-[14px] my-2">
                    Account Type
                  </h4>
                  <div className="flex">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="admin account"
                        id=""
                        className="bg-red-500 w-[17px] h-[17px] mr-2"
                      />
                      <div className="">
                        <h5 className="leading-none text-[#2C698D] text-[14px] font-medium">
                          Admin Account
                        </h5>
                        <p className="text-[#595959] text-[12px]">
                          This user has full access to all features except
                          creating Admins.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="regular account"
                        id=""
                        className="bg-red-500 w-[17px] h-[17px] mr-2"
                      />
                      <div className="">
                        <h5 className="leading-none text-[#595959] text-[14px] font-medium">
                          Regular User Account
                        </h5>
                        <p className="text-[#595959] text-[12px]">
                          This user is only has access to basic assigned
                          features.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto justify-self-end flex">
                  <div className="mr-2">
                    <Image src={NoteIcon} alt="information" />
                  </div>
                  <div className="">
                    <h5 className="text-[#1F1F1F] text-[14px] leading-none font-medium mb-3">
                      Note
                    </h5>
                    <p className="text-[#787878] text-[12px]">
                      Adding new user sends an invitation link to their mail
                      which will expire within 7 days, if the new user does not
                      activate their account.
                    </p>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewUserModal;
