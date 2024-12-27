"use client";
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import * as Yup from "yup";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import Image from "next/image";

const BusinessInfoModal = ({
  handleToggleBusinessInfoModal,
  toggleBusinessInfoModal,
  isDetailsUploaded,
  uploadedDetails,
}) => {
  const initialValues = {
    businessName: "",
    businessType: "",
    industrySector: "",
    businessAddress: "",
    businessWebsite: "",
    businessSize: "",
  };

  const schema = Yup.object().shape({
    businessName: Yup.string().max(255).required("Business name is required"),
    businessType: Yup.string().max(255).required("Business type is required"),
    industrySector: Yup.string()
      .max(255)
      .required("Industry Sector is required"),
    businessAddress: Yup.string()
      .max(255)
      .required("Business Address is required"),
    businessWebsite: Yup.string()
      .max(255)
      .required("Business Website is required"),
    businessSize: Yup.string().max(255).required("Business size is required"),
  });

  const { data: session } = useSession();
  const { setShowSpinner } = useContext(ConfigContext).spinner;

  const queryClient = useQueryClient();

  
  return (
    <>
      {toggleBusinessInfoModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2]  py-[20px] fixed bottom-0 right-0 top-0 left-0 z-40 flex items-center justify-center">
          <div className="bg-white w-[784px] h-[90vh] border  relative px-[100px] py-[50px]">
            <div className="flex justify-between items-center">
              <div
                className="absolute left-[50px] cursor-pointer"
                onClick={() => handleToggleBusinessInfoModal()}
              >
                <Image src={BackArrow} alt="back arrow" />
              </div>
              <div className="">
                <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                  Business Information
                </h4>
              </div>
            </div>
            <p className="text-[#787878] text-[14px] mt-1 mb-5">
              Fill the necessary fields below with details about yourself
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                setShowSpinner(true);
                try {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/update-corporate?email=${session?.user?.corporateAdminEmail}`,
                    {
                      method: "PUT",
                      body: JSON.stringify({
                        businessName: values.businessName,
                        businessType: values.businessType,
                        industrySector: values.industrySector,
                        businessAddress: values.businessAddress,
                        businessWebsite: values.businessWebsite,
                        businessSize: values.businessSize,
                        agreeToTermsAndConditions: true,
                      }),
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
                    // Handle the error (e.g., display an error message to the user)
                    console.log(response.error);
                    throw new Error(response.error);
                  }
                  toast.success("Details Update Succesful!");
                  queryClient.invalidateQueries(["list-of-directors"]);
                  handleToggleBusinessInfoModal();

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
              <Form className=" mt-10 scroll-smooth">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="businessName"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Business Name
                    </label>
                    {isDetailsUploaded ? (
                      <Field
                        name="businessName"
                        type="text"
                        readOnly={isDetailsUploaded}
                        value={uploadedDetails?.businessName}
                        placeholder="Enter Business Name"
                        className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                      />
                    ) : (
                      <Field
                        name="businessName"
                        type="text"
                        placeholder="Enter Business Name"
                        className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                      />
                    )}

                    <span className="text-red-500 text-xs">
                      <ErrorMessage name="businessName" />
                    </span>
                  </div>

                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="company size"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Business Type
                    </label>
                    <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                      {isDetailsUploaded ? (
                        <Field
                          name="businessType"
                          value={uploadedDetails?.businessType}
                          readOnly={true}
                          type="text"
                          className=" border-solid text-[#8C8C8C] focus:outline-none border-b px-3 text-xs h-10 rounded-[4px]"
                        />
                      ) : (
                        <Field
                          name="businessType"
                          as="select"
                          readOnly={isDetailsUploaded}
                          className="bg-white w-full h-full outline-none"
                        >
                          <option value="">--Select--</option>
                          <option value="Limited Liability">Limited Liability</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Others">Others</option>
                        </Field>
                      )}
                    </div>
                    <span className="text-red-500 text-xs">
                      {!isDetailsUploaded && (
                        <ErrorMessage name="businessType" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="company size"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Industry Sector
                    </label>
                    <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                      {isDetailsUploaded ? (
                        <Field
                          name="industrySector"
                          value={uploadedDetails?.industrySector}
                          readOnly={true}
                          type="text"
                          className=" border-solid text-[#8C8C8C] focus:outline-none border-b px-3 text-xs h-10 rounded-[4px]"
                        />
                      ) : (
                        <Field
                          name="industrySector"
                          as="select"
                          readOnly={isDetailsUploaded}
                          className="bg-white w-full h-full outline-none"
                        >
                          <option value="">--Select--</option>
                          <option value="Limited Liabilit">Limited Liability</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Others">Others</option>
                        </Field>
                      )}
                    </div>
                    <span className="text-red-500 text-xs">
                      {!isDetailsUploaded && (
                        <ErrorMessage name="industrySector" />
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="company size"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Business Size
                    </label>
                    <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C]">
                      {isDetailsUploaded ? (
                        <Field
                          name="businessSize"
                          value={uploadedDetails?.totalEmployees}
                          readOnly={true}
                          type="text"
                          className="border-[#D9D9D9] border-b  border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                      ) : (
                        <Field
                          name="businessSize"
                          as="select"
                          className="bg-white w-full h-full outline-none"
                        >
                          <option value="">--Select--</option>
                          <option value="10-100">10-100</option>
                          <option value="100-1000">100-1000</option>
                          <option value="1000-10000">1000-10000</option>
                        </Field>
                      )}
                    </div>
                    <span className="text-red-500 text-xs">
                      {!isDetailsUploaded && (
                        <ErrorMessage name="businessSize" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="officeAddress"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Business Address
                    </label>
                    {isDetailsUploaded ? (
                      <Field
                        name="businessAddress"
                        readOnly={isDetailsUploaded}
                        type="text"
                        value={uploadedDetails?.businessAddress}
                        placeholder="Enter Business Address"
                        className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] ${
                          isDetailsUploaded && "text-[#8C8C8C]"
                        } `}
                      />
                    ) : (
                      <Field
                        name="businessAddress"
                        type="text"
                        placeholder="Enter Business Address"
                        className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]`}
                      />
                    )}

                    <span className="text-red-500 text-xs">
                      {!isDetailsUploaded && (
                        <ErrorMessage name="businessAddress" />
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                    <label
                      htmlFor="officeAddress"
                      className="text-[#8C8C8C] text-sm"
                    >
                      Business Website
                    </label>
                    {isDetailsUploaded ? (
                      <Field
                        name="businessWebsite"
                        readOnly={isDetailsUploaded}
                        value={uploadedDetails?.websiteUrl}
                        type="text"
                        placeholder="Enter Business Website"
                        className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] ${
                          isDetailsUploaded && "text-[#8C8C8C]"
                        }`}
                      />
                    ) : (
                      <Field
                        name="businessWebsite"
                        type="text"
                        placeholder="Enter Business Website"
                        className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] `}
                      />
                    )}
                    <span className="text-red-500 text-xs">
                      {!isDetailsUploaded && (
                        <ErrorMessage name="businessWebsite" />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  disabled={isDetailsUploaded}
                  className={`h-[36px] w-[100px] rounded-[4px] ${
                    isDetailsUploaded
                      ? "bg-[#D9D9D9] text-gray-400 border"
                      : "bg-[#2C698D] text-white"
                  }  block ml-auto`}
                  type="submit"
                >
                  Save
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessInfoModal;
