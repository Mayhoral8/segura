"use client";
import React, { useState, useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field } from "formik";
import Image from "next/image";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import FileInputIcon from "../../../assets/adminDashboard/fileIcon.svg";
import PartnerAvatar from "../../../assets/adminDashboard/partnerAvatar.svg";
import DeleteIcon from "../../../assets/adminDashboard/delete.svg";
import Uploader from "../../../components/Uploader";
import { countryData } from "../../../config/countryData";
import * as Yup from "yup";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const BusinessParnerInfoModal = ({
  toggleBusinessParnerInfoModal,
  handleToggleBusinessParnerInfoModal,
  directorsList,
}) => {
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const initialValues = {
    fullName: "",
    title: "",
    dateOfBirth: "2024-12-26T07:41:07.200Z",
    nationality: "",
    residentialAddress: "",
    phoneNumber: "",
    email: "",
    bvn: "",
  };

  const {spinner, errorModal, file, directorsDocs} = useContext(ConfigContext)
  const { setShowSpinner } = spinner
  const {setShowErrorModal, setErrorMsg} = errorModal

  const schema = Yup.object().shape({
    fullName: Yup.string().max(30).required("Full name is required"),
    title: Yup.string().required("Title is required"),
    dateOfBirth: Yup.string().max(255).required("Date of Birth is required"),
    nationality: Yup.string().max(255).required("Nationality is required"),
    residentialAddress: Yup.string()
      .max(255)
      .required("Residential Address is required"),
    phoneNumber: Yup.string().max(255).required("Pone number is required"),
    email: Yup.string().max(255).required("Email is required"),
    bvn: Yup.string().max(255).required("BVN is required"),
  });

 
  

  const queryClient = useQueryClient();
  return (
    <>
      {toggleBusinessParnerInfoModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] fixed py-[20px] bottom-0 right-0 top-0 left-0 z-40 flex items-center justify-center ">
          <div className="bg-white h-[90vh] w-[784px] relative px-[100px] py-[50px]  ">
            {showForm ? (
              <div className="">
                <div
                  className="absolute left-[50px] cursor-pointer"
                  onClick={() => toggleForm()}
                >
                  <Image src={BackArrow} alt="back arrow" />
                </div>
                <div className="flex justify-between items-center gap-5">
                  <div className="">
                    <h4 className="text-[#1F1F1F] text-[20px] font-bold text-wrap">
                      Please Provide Necessary Details and Document of Each
                      Partners/Directors With 5% Ownership
                    </h4>
                    <p className="text-[#787878] text-[14px] mt-1 mb-5">
                      Fill the necessary fields below and upload required
                      documents
                    </p>
                  </div>
               
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setShowSpinner(true);
                    const corporateId = localStorage.getItem("corporateId");
                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${corporateId}/add-directors`,
                        {
                          method: "POST",
                          body: JSON.stringify([{
                            fullName: values.fullName,
                            title: values.title,
                            dateOfBirth: "2024-12-26T07:41:07.200Z",
                            nationality: values.nationality,
                            residentialAddress: values.residentialAddress,
                            phoneNumber: values.phoneNumber,
                            email: values.email,
                            bvn: values.bvn,
                            documents: directorsDocs,
                          }]),
                          headers: {
                            Authorization: `Bearer ${session?.user?.accessToken}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      const responseData = await response.json();
                      console.log(responseData);
                      console.log(response);
                      if (!response.ok) {
                        console.log(response.error);
                        throw new Error(response.error);
                      }
                      toast.success("Details Update Succesfully!");
                      queryClient.invalidateQueries(["primaryBusinessInfo"]);
                      toggleForm()

                      setShowSpinner(false);
                    } catch (error) {
                      console.log(error);
                      console.log(error.message);
                      setShowSpinner(false);
                      setShowErrorModal(true);
                      setErrorMsg(error.message); // Handle unexpected errors
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <Form className="overflow-y-scroll h-[320px]">
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="officeAddress"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Full Name
                        </label>
                        <Field
                          name="fullName"
                          type="text"
                          placeholder="Enter fullname"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="fullName" />
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
                            <option value="">Select</option>
                            <option value="green">Mr</option>
                            <option value="blue">Mrs</option>
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
                          Email Address
                        </label>
                        <Field
                          name="email"
                          type="text"
                          placeholder="Enter email address"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="email" />
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
                          name="residentialAddress"
                          type="text"
                          placeholder="Enter Residential Address"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="residentialAddress" />
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
                          name="dateOfBirth"
                          type="text"
                          placeholder="00/00/1999"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="dateOfBirth" />
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label htmlFor="bvn" className="text-[#8C8C8C] text-sm">
                          Bank Verfication Number (BVN)
                        </label>
                        <Field
                          name="bvn"
                          type="text"
                          placeholder="Enter bvn"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="bvn" />
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
                          name="phoneNumber"
                          type="text"
                          placeholder="+234"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="phoneNumber" />
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="officeAddress"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Nationality
                        </label>
                        <Field
                          name="nationality"
                          as="select"
                          type="text"
                          placeholder="officeCountry"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
                        >
                          <option value="" defaultValue="" className="italic">
                            --Select Country--
                          </option>
                          {countryData.map((country, i) => {
                            const countryName = country.name;
                            return (
                              <option
                                key={i}
                                value={country.name}
                                className="text-gray-950"
                              >
                                {countryName}
                              </option>
                            );
                          })}
                        </Field>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="nationality" />
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
                            Accepted Valid ID (International Passport/ National
                            ID/ Drivers License)
                          </li>
                        </ul>
                      </div>
                      <div className="w-[47%]">
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="flex text-[#787878] text-[14px]"
                          >
                            <Image
                              src={FileInputIcon}
                              alt=""
                              className="mr-2"
                            />
                            Passport Photograph
                          </label>
                          <Uploader  type="Passport Photograph" user="director"/>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="flex text-[#787878] text-[14px]"
                          >
                            <Image
                              src={FileInputIcon}
                              alt=""
                              className="mr-2"
                            />
                            Valid Government ID
                          </label>
                          <Uploader  type="Government Id" user="director"/>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="flex text-[#787878] text-[14px]"
                          >
                            <Image
                              src={FileInputIcon}
                              alt=""
                              className="mr-2"
                            />
                            Proof of Address (Utility Bill)
                          </label>
                          <Uploader type="Proof of Address" user="director"/>
                        </div>
                      </div>
                    </div>
                    <div className="border-t bg-white fixed bottom-0 h-12 mb-7 w-[61%] flex items-center justify-center  right-0 left-0 mx-auto">

                    <button className="h-[36px] flex-shrink-0 w-[100px] rounded-[4px] bg-[#2C698D] text-white" type="submit">
                    Add Partner
                  </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            ) : (
              <div className="">
                <div className="flex flex-col">
                  <div
                    className="absolute left-[50px] cursor-pointer"
                    onClick={() => handleToggleBusinessParnerInfoModal()}
                  >
                    <Image src={BackArrow} alt="back arrow" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="">
                      <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                        Business Partner Information
                      </h4>
                    </div>
                    <button className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white">
                      Save
                    </button>
                  </div>
                  <p className="text-[#787878] text-[14px] mt-1 mb-5">
                    Fill the necessary fields below with details of Partners
                  </p>
                  <div className="w-full min-h-[50vh] grid auto-rows-max grid-cols-2 gap-5 ">
                    {directorsList?.length >= 1 ? (
                      directorsList?.map((director, i) => {
                        return (
                          <div key={i} className="h-[114px] rounded-[6px] border-2 border-[#F0F0F0] px-3 py-3">
                            <Image src={PartnerAvatar} alt="" />
                            <div className="flex justify-between items-center mt-2">
                              <div className="">
                                <h4 className="text-[14px] font-semibold">
                                  {director.fullName}
                                </h4>
                                <p className="text-[12px]">
                                  {director.email}
                                </p>
                              </div>
                              <Image src={DeleteIcon} alt="delete" />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center w-[585px] h-full ">
                        <span className="mt-20 text-lg font-bold">
                          No Directors/Partners Found
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="h-[36px] w-[200px] text-[14px] flex items-center justify-center rounded-[4px] border-[#2C698D] border-[2px] text-[#2C698D] mt-5 ml-auto justify-self-end"
                    onClick={toggleForm}
                  >
                    Add New{" "}
                    <span className="text-[26px] font-semibold ml-2">+</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessParnerInfoModal;
