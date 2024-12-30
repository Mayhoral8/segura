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
import BusinessPartnerInfo from "@/components/Onboarding/BusinessPartnerInfo";

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
    dateOfBirth: "",
    nationality: "",
    residentialAddress: "",
    phoneNumber: "",
    email: "",
    bvn: "",
    passportPhotograph: "",
    governmentId: "",
    proofOfAddress: "",
  };

  const {
    spinner,
    errorModal,
    file,
    directorsDocs,
    userContext,
    showDirectorDetails,
    setShowDirectorDetails,
    setDirectorInView,
  } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const { setShowErrorModal, setErrorMsg } = errorModal;

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

  const handleViewDirectorDetails = (director) => {
    console.log(director);
    setDirectorInView(director);
    setShowDirectorDetails(true);
  };
  return (
    <>
      <BusinessPartnerInfo />
      {toggleBusinessParnerInfoModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] fixed py-[20px] bottom-0 right-0 top-0 left-0 z-40 flex items-center justify-center">
          <div className="bg-white h-[90vh] w-[784px] relative px-[100px] py-[50px]  overflow-y-hidden">
            {showForm ? (
              <div className="">
                <div
                  className="absolute left-[50px] cursor-pointer"
                  onClick={() => toggleForm()}
                >
                  <Image src={BackArrow} alt="back arrow" />
                </div>
                <div className="flex justify-between items-center gap-5 ">
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
                    console.log(values);
                    const corporateId = localStorage.getItem("corporateId");
                    const isoDate = convertToISO(values.dateOfBirth);

                    try {
                      setShowSpinner(true);
                      directorsDocs.map((doc) => {
                        if (doc.url === "") {
                          throw new Error(
                            `${doc.name} url not found, please try uploading again`
                          );
                        }
                      });
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${corporateId}/add-directors`,
                        {
                          method: "POST",
                          body: JSON.stringify([
                            {
                              fullName: values.fullName,
                              title: values.title,
                              dateOfBirth: isoDate,
                              nationality: values.nationality,
                              residentialAddress: values.residentialAddress,
                              phoneNumber: values.phoneNumber,
                              email: values.email,
                              bvn: values.bvn,
                              documents: directorsDocs,
                            },
                          ]),
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
                      toggleForm();

                      setShowSpinner(false);
                    } catch (error) {
                      console.log(error);
                      console.log(error.message);
                      toast.error(error.message);
                      setShowSpinner(false);
                      setShowErrorModal(true);
                      setErrorMsg(error.message); // Handle unexpected errors
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ setFieldValue, setTouched, values }) => (
                    <Form className="overflow-y-scroll bg-red h-[350px] pb-20 px-1 ">
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
                              <option value="Mr">Mr</option>
                              <option value="Mrs">Mrs</option>
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
                            type="date"
                            placeholder="00/00/1999"
                            className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                          />
                          <span className="text-red-500 text-xs">
                            <ErrorMessage name="dateOfBirth" />
                          </span>
                        </div>
                        <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                          <label
                            htmlFor="bvn"
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
                              Accepted Valid ID (International Passport/
                              National ID/ Drivers License)
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
                            <Uploader
                              type="passportPhotograph"
                              name="Passport Photograph"
                              owner="director"
                              setFieldValue={setFieldValue}
                            />
                            {console.log(values)}

                            <span className="text-red-500 text-xs">
                              <ErrorMessage name="passportPhotograph" />
                            </span>
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
                            <Uploader
                              type="governmentId"
                              name="Government Id"
                              owner="director"
                              setFieldValue={setFieldValue}
                            />
                            <span className="text-red-500 text-xs">
                              <ErrorMessage name="governmentId" />
                            </span>
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
                            <Uploader
                              type="proofOfAddress"
                              name="Proof Of Address"
                              owner="director"
                              setFieldValue={setFieldValue}
                            />
                            <span className="text-red-500 text-xs">
                              <ErrorMessage name="proofOfAddress" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="fixed bottom-0 w-[60%] h-12 mb-7 flex items-center justify-center bg-white right-0 left-0 mx-auto overflow-y-hidden">
                        <button
                          className="h-[36px] flex-shrink-0 w-[120px] rounded-[4px] bg-[#2C698D] text-white "
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
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
                  <div className="w-full h-[300px] grid auto-rows-max grid-cols-2 gap-5 overflow-y-scroll bg-white border">
                    {directorsList?.length >= 1 ? (
                      directorsList?.map((director, i) => {
                        console.log(director);
                        return (
                          <div
                            key={i}
                            className="h-[114px] rounded-[6px] border-2 border-[#F0F0F0] px-3 py-3 cursor-pointer"
                            title="Click to view details"
                            onClick={() => handleViewDirectorDetails(director)}
                          >
                            <Image src={PartnerAvatar} alt="" />
                            <div className="flex justify-between items-center mt-2">
                              <div className="">
                                <h4 className="text-[14px] font-semibold">
                                  {director.fullName}
                                </h4>
                                <p className="text-[12px]">{director.email}</p>
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
