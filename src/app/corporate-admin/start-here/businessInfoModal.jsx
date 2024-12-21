import React from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";

import * as Yup from "yup";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import FileInputIcon from "../../../assets/adminDashboard/fileIcon.svg";
import Image from "next/image";
import Uploader from "../../../components/Uploader";

const BusinessInfoModal = ({
  handleToggleBusinessInfoModal,
  toggleBusinessInfoModal,
}) => {
  return (
    <>
      {toggleBusinessInfoModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] absolute py-[20px] top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white w-[784px] relative px-[100px] py-[50px]">
            <div
              className="absolute left-[50px] cursor-pointer"
              onClick={() => handleToggleBusinessInfoModal()}
            >
              <Image src={BackArrow} alt="back arrow" />
            </div>
            <Formik>
              <Form className="">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                      Business Information
                    </h4>
                  </div>
                  <button className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white">
                    Save
                  </button>
                </div>
                <p className="text-[#787878] text-[14px] mt-1 mb-5">
                  Fill the necessary fields below with details about yourself
                </p>

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
                    <label
                      htmlFor="company size"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Title
                    </label>
                    <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                      <Field
                        name="title"
                        as="select"
                        className="bg-white w-full h-full outline-none"
                      >
                        <option value="red">Select</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                      </Field>
                    </div>
                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="title" />
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="officeAddress"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Rmail Address
                    </label>
                    <Field
                      name="email address"
                      type="text"
                      placeholder="Enter email address"
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
                      Residential Address
                    </label>
                    <Field
                      name="residential address"
                      type="text"
                      placeholder="Enter address location"
                      className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                    />
                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="address location" />
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
                      Bank Verfication Number (BVN)
                    </label>
                    <Field
                      name="bvn"
                      type="text"
                      placeholder="Enter bvn"
                      className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                    />
                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="company name" />
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between">
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
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="officeAddress"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Country
                    </label>
                    <Field
                      name="company name"
                      type="text"
                      placeholder="Enter country"
                      className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                    />
                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="company name" />
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-between mt-3">
                  <div className="w-[47%]">
                    <h4 className="font-bold mb-2">Image requirements</h4>
                    <ul className="ml-5 list-disc text-[#787878] leading-6">
                      <li>File size not more than 3MB</li>
                      <li>BMP, JPG, JPEG or PNG format</li>
                      <li>Contained your name and address</li>
                      <li>Issues within the last 1 year</li>
                      <li>
                        Accepted Valid ID (International Passport/ National ID/
                        Drivers License)
                      </li>
                    </ul>
                  </div>
                  <div className="w-[47%]">
                    <div className="mb-3">
                      <label
                        htmlFor=""
                        className="flex text-[#787878] text-[14px]"
                      >
                        <Image src={FileInputIcon} alt="" className="mr-2" />
                        Passport Photograph
                      </label>
                      <Uploader />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor=""
                        className="flex text-[#787878] text-[14px]"
                      >
                        <Image src={FileInputIcon} alt="" className="mr-2" />
                        Valid Government ID
                      </label>
                      <Uploader />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor=""
                        className="flex text-[#787878] text-[14px]"
                      >
                        <Image src={FileInputIcon} alt="" className="mr-2" />
                        Proof of Address (Utility Bill)
                      </label>
                      <Uploader />
                    </div>
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

export default BusinessInfoModal;
