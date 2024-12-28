"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field, useFormikContext } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { countryData } from "../../../config/countryData";
import { industryData } from "../../../config/industryData";
import * as Yup from "yup";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import Image from "next/image";
import { FaPen } from "react-icons/fa6";
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
    businessEmail: uploadedDetails?.email || "",
    // describeBusiness: "",
    businessType: uploadedDetails?.businessType || "",
    phoneNumber: uploadedDetails?.phoneNumber || "",
    industrySector: uploadedDetails?.industrySector || "",
    businessAddress: uploadedDetails?.businessAddress || "",
    businessWebsite: uploadedDetails?.businessWebsite || "",
    businessSize: uploadedDetails?.totalEmployees || "",
    // country: "",
    // city: "",
    // bvn: "",
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

  const [editMode, setEditMode] = useState(false); // Default to false initially

  useEffect(() => {
    if (uploadedDetails) {
      setEditMode(true); // Update editMode when uploadedDetails is populated
    }
  }, [uploadedDetails]);
  // console.log(uploadedDetails, editMode, isDetailsUploaded);

  const values = useFormikContext();
  const updateDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/update-corporate?email=${session?.user?.corporateAdminEmail}`,
        {
          method: "PUT",
          body: JSON.stringify({
            businessName: values.businessName,
            // businessEmail: values.businessEmail,
            // describeBusiness: values.describeBusiness,
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
    }
  };

  const handleEditMode = (type) => {
    setEditMode(!editMode);
    if (type) {
      updateDetails();
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
                  setShowSpinner(true);
                  console.log("Form Values:", values);
                  // // setEditMode(!editMode);
                  // try {
                  //   const response = await fetch(
                  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/update-corporate?email=${session?.user?.corporateAdminEmail}`,
                  //     {
                  //       method: "PUT",
                  //       body: JSON.stringify({
                  //         businessName: values.businessName,
                  //         // businessEmail: values.businessEmail,
                  //         // describeBusiness: values.describeBusiness,
                  //         businessType: values.businessType,
                  //         industrySector: values.industrySector,
                  //         businessAddress: values.businessAddress,
                  //         businessWebsite: values.businessWebsite,
                  //         businessSize: values.businessSize,
                  //         agreeToTermsAndConditions: true,
                  //       }),
                  //       headers: {
                  //         Authorization: `Bearer ${session?.user?.accessToken}`,
                  //         "Content-Type": "application/json",
                  //       },
                  //     }
                  //   );
                  //   const responseData = await response.json();
                  //   console.log(responseData);
                  //   console.log(response);
                  //   if (!response.ok) {
                  //     // Handle the error (e.g., display an error message to the user)
                  //     console.log(response.error);
                  //     throw new Error(response.error);
                  //   }
                  //   toast.success("Details Update Succesful!");
                  //   queryClient.invalidateQueries(["list-of-directors"]);
                  //   handleToggleBusinessInfoModal();

                  //   setShowSpinner(false);
                  // } catch (error) {
                  //   console.log(error);
                  //   console.log(error.message);
                  //   setShowSpinner(false);
                  //   setShowErrorModal(true);
                  //   setErrorMsg(error.message); // Handle unexpected errors
                  // } finally {
                  //   setSubmitting(false);
                  // }
                }}
              >
                 {({ setFieldValue }) => (
                <Form className=" mt-5 scroll-smooth">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="businessName"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Business Name
                      </label>
                      <Field
                        name="businessName"
                        type="text"
                        readOnly={editMode}
                        placeholder="Enter Business Name"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="businessName" />}
                      </span>
                    </div>

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
                        readOnly={false}
                        placeholder="Enter Business Email"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="businessEmail" />}
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
                          readOnly={editMode}
                          as="textarea"
                          placeholder="Describe Business"
                          className={`border-[#D9D9D9] border-[1px] border-solid focus:outline-none p-2 text-xs h-[80px] rounded-[4px] ${
                            editMode && "text-[#8C8C8C]"
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
                        {!editMode && <ErrorMessage name="describeBusiness" />}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="businessAddress"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Business Address
                      </label>
                      <Field
                        name="businessAddress"
                        type="text"
                        readOnly={editMode}
                        placeholder="Enter Business Address"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="businessAddress" />}
                      </span>
                    </div>
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="businessWebsite"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Business Name
                      </label>
                      <Field
                        name="businessWebsite"
                        type="text"
                        readOnly={editMode}
                        placeholder="Enter Business Website"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="businessWebsite" />}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="phoneNumber"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        type="text"
                        readOnly={editMode}
                        placeholder="Enter Phone number"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="phoneNumber" />}
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
                        {editMode ? (
                          <Field
                            name="industrySector"
                            readOnly={true}
                            type="text"
                            className=" border-solid text-[#8C8C8C] focus:outline-none border-b px-3 text-xs h-10 rounded-[4px]"
                          />
                        ) : (
                          <Field
                            name="industrySector"
                            as="select"
                            readOnly={editMode}
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
                        {!editMode && <ErrorMessage name="industrySector" />}
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
                        {editMode ? (
                          <Field
                            name="businessSize"
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
                        {!editMode && <ErrorMessage name="businessSize" />}
                      </span>
                    </div>
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label htmlFor="bvn" className="text-[#8C8C8C] text-sm">
                        Bvn
                      </label>
                      <Field
                        name="bvn"
                        type="text"
                        readOnly={editMode}
                        placeholder="Enter Business Name"
                        className={`border-[#D9D9D9] text-[#8C8C8C] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
                          editMode ? "bg-gray-100" : ""
                        }`}
                      />
                      <span className="text-red-500 text-xs">
                        {!editMode && <ErrorMessage name="bvn" />}
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
                  {editMode ? (
                    <button
                      // disabled={editMode}
                      className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}  block ml-auto absolute top-0 right-0 cursor-pointer`}
                      type="submit"
                      
                      name="action"
                      value="submit"
                      onClick={(e) => setFieldValue("action", e.target.value)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      // disabled={editMode}
                      className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}  block ml-auto absolute top-0 right-0 cursor-pointer`}
                      type="submit"
                      name="action"
                      value="submit"
                      onClick={(e) => setFieldValue("action", e.target.value)}
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
