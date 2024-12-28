"use client";
import React, { useContext, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { countryData } from "../../../config/countryData";
import { industryData } from "../../../config/industryData";
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
  const [selectedBusinessType, setSelectedBusinessType] =
    useState("Limited Liability");

  const initialValues = {
    businessName: "",
    businessEmail: "",
    describeBusiness: "",
    businessType: "",
    phoneNumber: "",
    industrySector: "",
    businessAddress: "",
    businessWebsite: "",
    businessSize: "",
    country: "",
    city: "",
    bvn: "",
  };

  const businessTypes = [
    { name: "Limited Liability" },
    { name: "Partnership" },
  ];

  const schema = Yup.object().shape({
    businessName: Yup.string().max(255).required("Business name is required"),
    businessEmail: Yup.string().required("Business Email is required"),
    describeBusiness: Yup.string().required("Description is missing"),
    country: Yup.string().max(255).required("Select a country"),
    businessType: Yup.string().max(255).required("Business type is required"),
    phoneNumber: Yup.string().max(255).required("Phone Number is required"),
    city: Yup.string().max(255).required("Select a city"),
    industrySector: Yup.string()
      .max(255)
      .required("Industry Sector is required"),
    businessAddress: Yup.string()
      .max(255)
      .required("Business Address is required"),
    businessWebsite: Yup.string().max(255).nullable(),
    businessSize: Yup.string().max(255).required("Business size is required"),
    bvn: Yup.string().max(255).required("Bank Verification Number is required"),
  });

  const { data: session, status } = useSession();
  const { setShowSpinner } = useContext(ConfigContext).spinner;

  const queryClient = useQueryClient();

  return (
    <>
      {toggleBusinessInfoModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] py-[20px] fixed bottom-0 right-0 top-0 left-0 z-40 flex items-center justify-center">
          <div className="bg-white w-[784px] h-[90vh] border  relative px-[100px] py-[50px] overflow-hidden">
            <div
              className="absolute left-[50px] cursor-pointer"
              onClick={() => handleToggleBusinessInfoModal()}
            >
              <Image src={BackArrow} alt="back arrow" />
            </div>
            <div className="h-full w-full overflow-scroll relative">
              <div className="flex justify-between items-center">
                <div className="">
                  <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                    Business Information
                  </h4>
                </div>
              </div>
              <p className="text-[#787878] text-[14px] mt-1 mb-2">
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
                          businessEmail: values.businessEmail,
                          describeBusiness: values.describeBusiness,
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
                <Form className=" mt-5 scroll-smooth">
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
                        Business Email Address
                      </label>
                      <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                        {isDetailsUploaded ? (
                          <Field
                            name="businessEmail"
                            value={uploadedDetails?.businessEmail}
                            readOnly={true}
                            type="text"
                            placeholder="Enter Business Email Address"
                            className=" border-solid text-[#8C8C8C] focus:outline-none border-b px-3 text-xs h-10 rounded-[4px]"
                          />
                        ) : (
                          <Field
                            name="businessEmail"
                            type="text"
                            placeholder="Enter Business Email Address"
                            readOnly={isDetailsUploaded}
                            className="bg-white w-full h-full outline-none"
                          />
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        {!isDetailsUploaded && (
                          <ErrorMessage name="businessEmail" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-full gap-y-2 mb-2">
                      <label
                        htmlFor="officeAddress"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Describe Business
                      </label>
                      {isDetailsUploaded ? (
                        <textarea
                          name="describeBusiness"
                          readOnly={isDetailsUploaded}
                          as="textarea"
                          value={uploadedDetails?.describeBusiness}
                          placeholder="Describe Business"
                          className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none p-2 text-xs h-[80px] rounded-[4px] ${
                            isDetailsUploaded && "text-[#8C8C8C]"
                          } resize-none`}
                        />
                      ) : (
                        <textarea
                          name="describeBusiness"
                          type="text"
                          placeholder="Describe Business"
                          className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none p-2 text-xs h-[80px] rounded-[4px] resize-none`}
                        />
                      )}

                      <span className="text-red-500 text-xs">
                        {!isDetailsUploaded && (
                          <ErrorMessage name="describeBusiness" />
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
                        Business Website (<i>if available</i>)
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
                        Country
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
                        <ErrorMessage name="country" />
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label htmlFor="city" className="text-[#8C8C8C] text-sm">
                        City
                      </label>
                      <Field
                        name="city"
                        as="select"
                        type="text"
                        placeholder="city"
                        className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
                      >
                        <option value="" defaultValue="" className="italic">
                          --Select City--
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
                        <ErrorMessage name="city" />
                      </span>
                    </div>
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="Industry Sector"
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
                            <option value="">--Select Industry--</option>
                            {industryData.map((industry) => (
                              <option
                                key={industry.value}
                                value={industry.value}
                              >
                                {industry.label}
                              </option>
                            ))}
                          </Field>
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        {!isDetailsUploaded && (
                          <ErrorMessage name="industrySector" />
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
                        Business/Company Size
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
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label htmlFor="bvn" className="text-[#8C8C8C] text-sm">
                        Bank Verification Number (<i>BVN</i>)
                      </label>
                      <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                        {isDetailsUploaded ? (
                          <Field
                            name="bbn"
                            value={uploadedDetails?.bvn}
                            readOnly={true}
                            type="text"
                            className=" border-solid text-[#8C8C8C] focus:outline-none border-b px-3 text-xs h-10 rounded-[4px]"
                          />
                        ) : (
                          <Field
                            name="businessType"
                            type="text"
                            placeholder="Enter 11 digits"
                            readOnly={isDetailsUploaded}
                            className="bg-white w-full h-full outline-none"
                          />
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        {!isDetailsUploaded && <ErrorMessage name="bvn" />}
                      </span>
                    </div>
                  </div>
                  {/* Wallet Selection */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Type</h3>
                    <div className="flex justify-between gap-5">
                      {businessTypes.map((businessType) => (
                        <div
                          key={businessType.name}
                          onClick={() =>
                            setSelectedBusinessType(businessType.name)
                          }
                          className={`flex items-center justify-center h-[40px] border w-[120px] rounded-lg text-sm font-medium 
            ${
              selectedBusinessType === businessType.name
                ? "border-[#2C698D] bg-[#E3F6F5]"
                : "border-[#F0F0F0] bg-white"
            } transition flex-grow cursor-pointer`}
                        >
                          {businessType.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    disabled={isDetailsUploaded}
                    className={`h-[36px] w-[100px] rounded-[4px] ${
                      isDetailsUploaded
                        ? "bg-[#D9D9D9] text-gray-400 border"
                        : "bg-[#2C698D] text-white"
                    }  block ml-auto absolute top-0 right-0`}
                    type="submit"
                  >
                    Save
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessInfoModal;
