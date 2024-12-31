"use client";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { AnimateDropdown } from "../../../components/Animate";
import { RxCaretDown } from "react-icons/rx";
import { countryData } from "../../../config/countryData";
import * as Yup from "yup";

import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import NoteIcon from "../../../assets/adminDashboard/information.svg";

import Image from "next/image";
import { useSession } from "next-auth/react";

const AddNewUserModal = ({ toggleNewUserModal, handleToggleNewUserModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCountryListVisible, setIsCountryListVisible] = useState(false);
  const [keyWord, setkeyWord] = useState("");
  const [countries, setCountries] = useState(countryData);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    businessName: "",
    fullName: "",
    dateOfBirth: "",
    emailAddress: "",
    homeAddress: "",
    officeCountry: "",
    department: "",
    phoneNumber: "",
    accountView: false,
    roleView: false,
    roleEdit: false,
    roleDelete: false,
    permissionAssign: false,
    permissionRemove: false,
  };

  const validationSchema = Yup.object({
    businessName: Yup.string().required("Business Name is required"),
    fullName: Yup.string().required("Full Name is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    homeAddress: Yup.string().required("Home Address is required"),
    officeCountry: Yup.string().required("Country is required"),
    department: Yup.string().required("Department is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    accountView: Yup.boolean(),
    roleView: Yup.boolean(),
    roleEdit: Yup.boolean(),
    roleDelete: Yup.boolean(),
    permissionAssign: Yup.boolean(),
    permissionRemove: Yup.boolean(),
    permissions: Yup.mixed().test(
      "at-least-one-checked",
      "At least one permission must be selected.",
      function () {
        const {
          accountView,
          roleView,
          roleEdit,
          roleDelete,
          permissionAssign,
          permissionRemove,
        } = this.parent;
        return (
          accountView ||
          roleView ||
          roleEdit ||
          roleDelete ||
          permissionAssign ||
          permissionRemove
        );
      }
    ),
  });

  const handleKeywordChange = (e) => {
    setkeyWord(e.target.value);
    setCountries(() => {
      return countryData.filter(({ name }) => {
        return name.toUpperCase().startsWith(e.target.value.toUpperCase());
      });
    });
  };

  const { data: session } = useSession();

  const showCountryList = () => {
    setIsCountryListVisible(!isCountryListVisible);
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <>
      {toggleNewUserModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] py-[20px] bottom-0 right-0 fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white h-[90vh] w-[784px] relative px-[100px] py-[50px] overflow-hidden">
            <div className="overflow-scroll h-full">
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
              </div>
              <p className="text-[#787878] text-[14px] mt-1 mb-5">
                Fill the necessary fields below with user details
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                // onSubmit={async (values, { setSubmitting }) => {
                //   console.log("p");
                //   const trimmedEmail = values.email.trim();
                //   setShowSpinner(true);
                //   try {
                //     const response = await fetch(
                //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/registerCorporateAdmin`,
                //       {
                //         method: "POST",
                //         body: JSON.stringify({
                //           businessName: values.businessName,
                //           email: trimmedEmail,
                //           officeCountry: values.officeCountry,
                //           phoneNumber: values.phoneNumber,
                //           password: values.password,
                //           confirmPassword: values.confirmPassword,
                //         }),
                //         headers: {
                //           "Content-Type": "application/json",
                //         },
                //       }
                //     );

                //     const responseData = await response.json();
                //     if (!response.ok) {
                //       console.log(response);
                //       throw new Error(responseData.responseMessage);
                //     }
                //     setShowSpinner(false);
                //     toast.success("Registration successful");
                //     router.push("/auth/login");
                //   } catch (err) {
                //     console.log(err.message);
                //     setShowSpinner(false);
                //     setShowErrorModal(true);
                //     setErrorMsg(err.message);
                //   }
                // }}

                onSubmit={async (values) => {
                  console.log("added");
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/registerCorporateUser`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          businessName: values.businessName,
                          fullName: values.fullName,
                          dateOfBirth: values.dateOfBirth,
                          emailAddress: values.emailAddress,
                          homeAddress: values.homeAddress,
                          officeCountry: values.officeCountry,
                          department: values.department,
                          phoneNumber: values.phoneNumber,
                          password: values.password,
                          confirmPassword: values.confirmPassword,
                        }),
                        headers: {
                          Authorization: `Bearer ${session?.user?.accessToken}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    const responseData = await response.json();
                    if (!response.ok) {
                      console.log(response);
                      throw new Error(responseData.responseMessage);
                    }
                  } catch (err) {
                    console.log(err.message);
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col scroll-smooth scrollbar-hide">
                    {/* Your form fields go here */}
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="businessName"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Business Name
                        </label>
                        <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                          <Field
                            name="businessName"
                            type="text"
                            placeholder="Enter Business Name"
                            className="bg-white w-full h-full outline-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="businessName" />
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="fullName"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Full Name
                        </label>
                        <Field
                          name="fullName"
                          type="text"
                          placeholder="Enter Full Name"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="fullName" />
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="email"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Date of Birth
                        </label>
                        <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                          <Field
                            name="dateOfBirth"
                            type="date"
                            className="bg-white w-full h-full outline-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="dateOfBirth" />
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="email"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Email Address
                        </label>
                        <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                          <Field
                            name="emailAddress"
                            type="text"
                            placeholder="Enter Email Address"
                            className="bg-white w-full h-full outline-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="emailAddress" />
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="homeAddress"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Home Address
                        </label>
                        <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                          <Field
                            name="homeAddress"
                            type="text"
                            placeholder="Enter Home Address"
                            className="bg-white w-full h-full outline-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="homeAddress" />
                        </span>
                      </div>
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="officeCountry"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Country
                        </label>
                        <div className="border w-full flex items-center">
                          <Field
                            name="officeCountry"
                            type="text"
                            placeholder="Enter or select a country"
                            className="border-[#D9D9D9] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950 w-full relative"
                          />
                          <RxCaretDown
                            className="text-lg cursor-pointer"
                            onClick={showCountryList}
                          />
                        </div>

                        <AnimateDropdown isVisible={isCountryListVisible}>
                          <article className="absolute border  text-xs flex-col rounded-md w-[300px] bg-white  transition-transform shadow-sm z-30 ml-[-30px]  h-[200px] overflow-y-auto ">
                            <div>
                              <input
                                value={keyWord}
                                onChange={handleKeywordChange}
                                placeholder="search country..."
                                className="border w-[300px] fixed mb-5 h-10 rounded-[4px] focus:outline-none px-1 "
                              />
                            </div>
                            <div className="mt-10 flex flex-col">
                              {countries.map((country, i) => {
                                const countryName = country.name;
                                const dialCode = country.dial_code;

                                return (
                                  <span
                                    key={i}
                                    value={country.name}
                                    onClick={() => {
                                      setFieldValue(
                                        "officeCountry",
                                        countryName
                                      ),
                                        showCountryList();
                                      setDialCode(dialCode);
                                    }}
                                    className="text-gray-950 p-2 cursor-pointer "
                                  >
                                    {countryName}
                                  </span>
                                );
                              })}
                            </div>
                          </article>
                        </AnimateDropdown>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="officeCountry" />
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="department"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Department
                        </label>
                        <Field
                          name="department"
                          as="select"
                          placeholder="Enter address location"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        >
                          <option value="">Select...</option>
                          <option value="Sales">Sales</option>
                        </Field>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="department" />
                        </span>
                      </div>
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
                          placeholder="+234"
                          className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                        />
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="phoneNumber" />
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between flex-col mb-5 text-[#8C8C8C]">
                      <p className="font-semibold">Permissions</p>
                      <div className="w-full mt-3">
                        <div className="flex gap-x-9 gap-y-4 flex-wrap">
                          {[
                            { name: "accountView", label: "Account View" },
                            { name: "roleView", label: "Role View" },
                            { name: "roleEdit", label: "Role Edit" },
                            { name: "roleDelete", label: "Role Delete" },
                            {
                              name: "permissionAssign",
                              label: "Permission Assign",
                            },
                            {
                              name: "permissionRemove",
                              label: "Permission Remove",
                            },
                          ].map((permission) => (
                            <div
                              key={permission.name}
                              className="text-[14px] flex items-center gap-2"
                            >
                              <label htmlFor={permission.name}>
                                {permission.label}
                              </label>
                              <Field
                                name={permission.name}
                                type="checkbox"
                                className="h-5 w-5"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-red-500 text-sm mt-2">
                        {(touched.accountView ||
                          touched.roleView ||
                          touched.roleEdit ||
                          touched.roleDelete ||
                          touched.permissionAssign ||
                          touched.permissionRemove) &&
                          errors.permissions && <p>{errors.permissions}</p>}
                      </div>
                    </div>
                    {/* Add other fields similarly */}
                    <div className="mt-auto justify-self-end flex">
                      <div className="mr-2">
                        <Image src={NoteIcon} alt="information" />
                      </div>
                      <div className="">
                        <h5 className="text-[#1F1F1F] text-[14px] leading-none font-medium mb-3">
                          Note
                        </h5>
                        <p className="text-[#787878] text-[12px]">
                          Adding a new user sends an invitation link to their
                          email, which will expire in 7 days if the user does
                          not activate their account.
                        </p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white text-[14px] absolute top-[50px] right-[100px]"
                    >
                      Add User
                    </button>
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

export default AddNewUserModal;
