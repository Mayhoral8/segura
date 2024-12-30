"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { countryData } from "../../../config/countryData";
import { industryData } from "../../../config/industryData";
import BusinessInfoModalField from "@/components/Onboarding/BusinessInfoModalField";
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
    businessName: uploadedDetails?.businessName || "",
    businessEmail: uploadedDetails?.businessEmail || "",
    // describeBusiness: "",
    businessType: uploadedDetails?.businessType || "",
    businessPhoneNumber: uploadedDetails?.businessPhoneNumber || "",
    industrySector: uploadedDetails?.industrySector || "",
    businessAddress: uploadedDetails?.businessAddress || "",
    businessWebsite: uploadedDetails?.businessWebsite || "",
    businessSize: uploadedDetails?.businessSize || "",
    country: uploadedDetails?.country || "",
    city: uploadedDetails?.city || "",
    bvn: uploadedDetails?.bvn || "",
  };

  const businessTypes = [
    { name: "Limited Liability" },
    { name: "Partnership" },
    { name: "Sole proprietorship" },
    { name: "General partnership" },
    { name: "Limited partnership." },
    { name: "Limited liability partnership (LLP)" },
    { name: "C corporation" },
    { name: "S corporation" },
  ];

  const schema = Yup.object().shape({
    businessName: Yup.string().max(255).required("Business name is required"),
    businessEmail: Yup.string().required("Business Email is required"),
    // describeBusiness: Yup.string().required("Description is missing"),
    country: Yup.string().max(255).required("Select a country"),
    businessType: Yup.string().max(255).required("Business type is required"),
    businessPhoneNumber: Yup.string()
      .min(7)
      .max(25)
      .required("Phone Number is required"),
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

  const { data: session } = useSession();
  const { setShowSpinner } = useContext(ConfigContext).spinner;
  const { setShowErrorModal, setErrorMsg } = useContext(ConfigContext).errorModal;

  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(!isDetailsUploaded); // Default to

  useEffect(() => {
    setEditMode(!isDetailsUploaded);
  }, [isDetailsUploaded]);
  const updateDetails = async (values) => {
    setShowSpinner(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/update-corporate?email=${session?.user?.corporateAdminEmail}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
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
    }
  };

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
                  setEditMode(!editMode);
                  const actionType =
                    Object.entries(values)[
                      Object.entries(values).length - 1
                    ][1];
                  if (actionType === "save") {
                    updateDetails(values);
                  }
                }}
              >
                {({ setFieldValue }) => (
                  <Form className=" px-1 mt-5 scroll-smooth">
                    <div className="flex w-full justify-between">
                      <BusinessInfoModalField
                        name="businessName"
                        placeholder="Enter Business Name"
                        title="Business Name"
                        readonly={!editMode}
                      />

                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="businessEmail"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Business Email
                        </label>
                        <Field
                          name="businessEmail"
                          type="text"
                          readOnly={true}
                          placeholder="Enter Business Email"
                          className={`border-[#D9D9D9] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] text-[#8C8C8C] bg-gray-100  `}
                        />
                        <span className="text-red-500 text-xs">
                          {<ErrorMessage name="businessEmail" />}
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
                        {editMode ? (
                          <textarea
                            name="describeBusiness"
                            readOnly={!editMode}
                            as="textarea"
                            placeholder="Describe Business"
                            className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none p-2 text-xs h-[80px] rounded-[4px]  ${
                              !editMode ? "" : "text-[#8C8C8C]"
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
                          {<ErrorMessage name="describeBusiness" />}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <BusinessInfoModalField
                        name="businessAddress"
                        placeholder="Enter Business Address"
                        title="Business Address"
                        readonly={!editMode}
                      />
                      <BusinessInfoModalField
                        name="businessWebsite"
                        placeholder="Enter Business Website"
                        title="Business Website (Optional)"
                        readonly={!editMode}
                      />
                    </div>
                    <div className="flex w-full justify-between">
                      <BusinessInfoModalField
                        name="businessPhoneNumber"
                        placeholder="Enter Business Phone Number"
                        title="Business Phone Number"
                        readonly={!editMode}
                      />
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="country"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Country
                        </label>
                        {editMode ? (
                          <Field
                            name="country"
                            readOnly={!editMode}
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
                        ) : (
                          <Field
                            name="country"
                            readOnly={!editMode}
                            className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                          />
                        )}
                        <span className="text-red-500 text-xs">
                          {<ErrorMessage name="country" />}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="city"
                          className="text-[#8C8C8C] text-sm"
                        >
                          City
                        </label>
                        {editMode ? (
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
                        ) : (
                          <Field
                            name="city"
                            readOnly={!editMode}
                            className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                          />
                        )}

                        <span className="text-red-500 text-xs">
                          {<ErrorMessage name="city" />}
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="industrySector"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Industry Sector
                        </label>
                        {editMode ? (
                          <Field
                            name="industrySector"
                            as="select"
                            readOnly={!editMode}
                            className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
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
                        ) : (
                          <Field
                            name="industrySector"
                            type="text"
                            className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                          />
                        )}
                        <span className="text-red-500 text-xs">
                          {<ErrorMessage name="industrySector" />}
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

                        {editMode ? (
                          <Field
                            name="businessSize"
                            as="select"
                            className="order-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
                          >
                            <option value="">--Select--</option>
                            <option value="10-100">10-100</option>
                            <option value="100-1000">100-1000</option>
                            <option value="1000-10000">1000-10000</option>
                          </Field>
                        ) : (
                          <Field
                            name="businessSize"
                            readOnly={!editMode}
                            type="text"
                            className="border-[#D9D9D9] border-b  border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                          />
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        {<ErrorMessage name="businessSize" />}
                      </span>

                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label htmlFor="bvn" className="text-[#8C8C8C] text-sm">
                          Bank Verification Number
                        </label>
                        <Field
                          name="bvn"
                          type="text"
                          readOnly={!editMode}
                          placeholder="Enter Bank Verification Number"
                          className={`border-[#D9D9D9] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px]  ${
                            !editMode ? "bg-gray-100 text-[#8C8C8C]" : ""
                          }`}
                        />
                        <span className="text-red-500 text-xs">
                          {<ErrorMessage name="bvn" />}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="company size"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Business Type
                      </label>

                      {editMode ? (
                        <Field
                          name="businessType"
                          as="select"
                          className="order-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
                        >
                          <option value="" defaultValue="" className="italic">
                            --Select Business Type--
                          </option>
                          {businessTypes.map((business, i) => {
                            const businessName = business.name;
                            return (
                              <option
                                key={i}
                                value={business.name}
                                className="text-gray-950"
                              >
                                {businessName}
                              </option>
                            );
                          })}
                        </Field>
                      ) : (
                        <Field
                          name="businessType"
                          readOnly={!editMode}
                          type="text"
                          className="border-[#D9D9D9] border-b  border-solid focus:outline-none px-3  text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                        />
                      )}

                      <span className="text-red-500 text-xs">
                        {<ErrorMessage name="businessType" />}
                      </span>
                    </div>

                    {!editMode ? (
                      <button
                        type="action"
                        name="buttonAction"
                        value="edit"
                        onClick={(e) =>
                          setFieldValue("buttonAction", e.target.value)
                        }
                        className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}  block ml-auto absolute top-0 right-0 cursor-pointer`}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="buttonAction"
                        value="save"
                        onClick={(e) =>
                          setFieldValue("buttonAction", e.target.value)
                        }
                        className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}  block ml-auto absolute top-0 right-0 cursor-pointer`}
                      >
                        Save
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessInfoModal;
