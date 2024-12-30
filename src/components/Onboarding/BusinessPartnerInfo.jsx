"use client";

import React, { useContext, useEffect, useState } from "react";
import { AnimateRightModal } from "../Animate";
import { HiMiniXMark } from "react-icons/hi2";
import { ConfigContext } from "@/contexts/ConfigContext";
import BusinessInfoModalField from "./BusinessInfoModalField";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Uploader from "../Uploader";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import FileInputIcon from "../../assets/adminDashboard/fileIcon.svg";
import Image from "next/image";
import { countryData } from "@/config/countryData";

const BusinessPartnerInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    showDirectorDetails,
    setShowDirectorDetails,
    userContext,
    directorsDocs,
    setDirectorsDocs,
    errorModal,
    spinner,
    directorInView,
    setDirectorInView,
  } = useContext(ConfigContext);

  const { setShowSpinner } = spinner;
  const { setErrorMsg, setShowErrorModal } = errorModal;
  const { data: session } = useSession();

  const hideModal = () => {
    setShowDirectorDetails(false);
  };

  console.log(directorInView?.documents);

  const initialValues = {
    fullName: directorInView?.fullName,
    title: directorInView?.title,
    dateOfBirth: directorInView?.dateOfBirth,
    nationality: directorInView?.nationality,
    residentialAddress: directorInView?.residentialAddress,
    phoneNumber: directorInView?.phoneNumber,
    email: directorInView?.email,
    bvn: directorInView?.bvn,
    passportPhotograph: directorInView?.documents?.[0]?.documentUrl || null,
    governmentId: directorInView?.documents?.[1]?.documentUrl || null,
    proofOfAddress: directorInView?.documents?.[2]?.documentUrl || null,
  };

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
    passportPhotograph: Yup.string().required(
      "Passport photograph is required"
    ),
    governmentId: Yup.string().required("Government ID is required"),
    proofOfAddress: Yup.string().required("Proof Of Address is required"),
  });

  const convertToISO = (dateString) => {
    // Parse the input date string in MM/DD/YYYY format
    const [year, month, day] = dateString.split("-").map(Number);

    // Create a Date object
    const date = new Date(year, month - 1, day);

    // Convert to ISO 8601 string
    return date.toISOString();
  };
  const queryClient = useQueryClient();

  console.log(directorInView);
  const updateDetails = async (values, directorInView) => {
    console.log(directorInView);
    const corporateId = localStorage.getItem("corporateId");
    const isoDate = convertToISO(values.dateOfBirth);
    try {
      setShowSpinner(true);
      directorInView?.documents?.map((doc) => {
        if (doc.url === "") {
          throw new Error(
            `${doc.name} url not found, please try uploading again`
          );
        }
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/director/${directorInView?.id}?corporateId=${corporateId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            fullName: values.fullName,
            title: values.title,
            dateOfBirth: isoDate,
            nationality: values.nationality,
            residentialAddress: values.residentialAddress,
            phoneNumber: values.phoneNumber,
            email: values.email,
            bvn: values.bvn,
            documents: directorInView?.documents,
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
        console.log(response.error);
        throw new Error(response.error);
      }
      toast.success("Details Update Succesful!");
      queryClient.invalidateQueries(["primaryBusinessInfo"]);
      setShowDirectorDetails(false);

      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error(error.message);
      setShowSpinner(false);
      setShowErrorModal(true);
      setErrorMsg(error.message);
    }
  };

  return (
    <AnimateRightModal isVisible={showDirectorDetails}>
      <section className="absolute h-full w-[600px] bg-white overflow-y-scroll flex items-center justify-center ">
        <div className="flex flex-row justify-between px-4 items-center text-lg fixed bg-white top-0 w-[580px] z-10 shadow-sm py-2">
          <span className=" font-semibold">Director Info</span>
          <HiMiniXMark
            onClick={hideModal}
            className="border text-2xl rounded-md cursor-pointer"
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("uds");
            setEditMode(!editMode);

            const actionType =
              Object.entries(values)[Object.entries(values).length - 1][1];

            // console.log(actionType);
            if (actionType === "save") {
              // setEditMode(!editMode);
              updateDetails(values, directorInView);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            // <section className="overflow-y-auto">

            <Form className="mx-auto w-[80%] overflow-y-auto py-10 mt-32">
              <article className="flex justify-between items-center">
                <BusinessInfoModalField
                  name="fullName"
                  placeholder="Enter Full Name"
                  title="Full Name"
                  readonly={!editMode}
                />
                {/* <BusinessInfoModalField
                  name="title"
                  placeholder="Enter Title"
                  title="Title"
                  readonly={!editMode}
                /> */}
                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label
                    htmlFor="company size"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Title
                  </label>

                  {editMode ? (
                    <Field
                      name="title"
                      as="select"
                      className="order-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950"
                    >
                      <option value="" defaultValue="" className="italic">
                        --Select Title--
                      </option>
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </Field>
                  ) : (
                    <Field
                      name="title"
                      readOnly={!editMode}
                      type="text"
                      className="border-[#D9D9D9] border-b  border-solid focus:outline-none px-3  text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                    />
                  )}

                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="title" />}
                  </span>
                </div>
              </article>

              <article className="flex justify-between items-center">
                <BusinessInfoModalField
                  name="dateOfBirth"
                  placeholder="Enter Date of Birth"
                  title="Date of Birth"
                  readonly={!editMode}
                />

                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label htmlFor="country" className="text-[#8C8C8C] text-sm">
                    Country
                  </label>
                  {editMode ? (
                    <Field
                      name="nationality"
                      readOnly={!editMode}
                      as="select"
                      type="text"
                      placeholder="Choose nationality"
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
                      name="nationality"
                      readOnly={!editMode}
                      className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-[#8C8C8C] bg-gray-100"
                    />
                  )}
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="country" />}
                  </span>
                </div>
              </article>

              <article className="flex justify-between items-center">
                <BusinessInfoModalField
                  name="residentialAddress"
                  placeholder="Enter Residential Address"
                  title="Residential Address"
                  readonly={!editMode}
                />

                <BusinessInfoModalField
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  title="Phone Number"
                  readonly={!editMode}
                />
              </article>

              <article className="flex justify-between items-center">
                <BusinessInfoModalField
                  name="email"
                  placeholder="Enter Email Address"
                  title="Email Address"
                  readonly={!editMode}
                />

                <BusinessInfoModalField
                  name="bvn"
                  placeholder="Enter Bank Verification Number"
                  title="Bank Verification Number"
                  readonly={!editMode}
                />
              </article>
              <div className="flex items-center flex-wrap justify-between">
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Passport Photograph
                  </label>
                  <Uploader
                    type="passportPhotograph"
                    name="Passport Photograph"
                    owner="director-update"
                    setFieldValue={setFieldValue}
                  />
                  {console.log(values, editMode)}

                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="passportPhotograph" />
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Valid Government ID
                  </label>
                  <Uploader
                    type="governmentId"
                    name="Government Id"
                    owner="director-update"
                    setFieldValue={setFieldValue}
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="governmentId" />
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Proof of Address (Utility Bill)
                  </label>
                  <Uploader
                    type="proofOfAddress"
                    name="Proof Of Address"
                    owner="director-update"
                    setFieldValue={setFieldValue}
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="proofOfAddress" />
                  </span>
                </div>
              </div>
              <div className="fixed h-10 bg-white  bottom-0 flex items-center justify-center w-[500px] mb-1">
                {!editMode ? (
                  <button
                    type="action"
                    name="buttonAction"
                    value="edit"
                    onClick={(e) => {
                      // setEditMode(!editMode);
                      setFieldValue("buttonAction", e.target.value);
                    }}
                    className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}   block ml-auto  right-0 cursor-pointer`}
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
                    className={`h-[36px] w-[100px] rounded-[4px] ${"bg-[#2C698D] text-white"}  block ml-auto  right-0 cursor-pointer`}
                  >
                    Save
                  </button>
                )}
              </div>
            </Form>
            // </section>
          )}
        </Formik>
      </section>
    </AnimateRightModal>
  );
};

export default BusinessPartnerInfo;
