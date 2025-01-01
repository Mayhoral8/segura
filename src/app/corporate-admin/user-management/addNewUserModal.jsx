"use client";
import React, { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { AnimateDropdown } from "../../../components/Animate";
import { RxCaretDown } from "react-icons/rx";
import { countryData } from "../../../config/countryData";
import * as Yup from "yup";
import { ConfigContext } from "@/contexts/ConfigContext";
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import NoteIcon from "../../../assets/adminDashboard/information.svg";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const validPermissions = {
  accountView: "PERMISSION_ACCOUNT_VIEW",
  roleView: "PERMISSION_ROLE_VIEW",
  roleEdit: "PERMISSION_ROLE_EDIT",
  roleDelete: "PERMISSION_ROLE_DELETE",
  permissionAssign: "PERMISSION_ASSIGN",
  permissionRemove: "PERMISSION_REMOVE",
};

const validateForm = (values) => {
  const errors = {};

  // Validate at least one permission is selected
  const hasPermission = Object.keys(validPermissions).some(
    (key) => values[key]
  );
  if (!hasPermission) {
    errors.permissions = "At least one permission must be selected.";
  }

  return errors;
};

const AddNewUserModal = ({ toggleNewUserModal, handleToggleNewUserModal }) => {
  const { setShowSpinner } = useContext(ConfigContext).spinner;
  const [dialCode, setDialCode] = useState("+1");
  const [isCountryListVisible, setIsCountryListVisible] = useState(false);
  const [keyWord, setkeyWord] = useState("");
  const [countries, setCountries] = useState(countryData);

  const initialValues = {
    businessName: "",
    fullName: "",
    dateOfBirth: "",
    emailAddress: "",
    officeAddress: "",
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
    officeAddress: Yup.string().required("Home Address is required"),
    officeCountry: Yup.string().required("Country is required"),
    department: Yup.string().required("Department is required"),
    phoneNumber: Yup.string()
      .max(24, "Phone number can not be more than 24 characters")
      .min(8, "Phone Number must be at least 8 characters")
      .required("Phone number is required"),
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
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] py-[20px] bottom-0 right-0 fixed top-0 left-0 z-30 flex items-center justify-center">
          <div className="bg-white h-[90vh] w-[784px] relative px-[100px] py-[50px] overflow-hidden">
            <div className="overflow-y-scroll h-full">
              <div
                className="absolute left-[50px] top-[35px] cursor-pointer z-[5000]"
                onClick={() => handleToggleNewUserModal()}
              >
                <Image src={BackArrow} alt="back arrow" />
              </div>
              <div className="w-screen fixed flex justify-center left-0 top-[65px] 2xl:top-[70px] z-40">
                <div className="w-[784px] bg-white fixed px-[100px] flex flex-col">
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
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  setShowSpinner(true);
                  try {
                    const permissionLists = Object.keys(validPermissions)
                      .filter((key) => values[key])
                      .map((key) => validPermissions[key]);

                    // Validate permissions
                    const invalidPermissions = permissionLists.filter(
                      (permission) =>
                        !Object.values(validPermissions).includes(permission)
                    );
                    if (invalidPermissions.length > 0) {
                      throw new Error("Invalid permissions selected.");
                    }

                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/registerCorporateUser`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          businessName: values.businessName,
                          fullName: values.fullName,
                          dateOfBirth: values.dateOfBirth,
                          email: values.emailAddress,
                          officeAdddress: values.officeAddress,
                          officeCountry: values.officeCountry,
                          department: values.department,
                          phoneNumber: values.phoneNumber,
                          permissionLists,
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
                    setShowSpinner(false);
                    toast.success("User creation successful");
                  } catch (err) {
                    setShowSpinner(false);
                    console.log(err.message);
                  }
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form className="flex flex-col scroll-smooth scrollbar-hide mt-[60px] 2xl:mt-[70px]">
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
                    {console.log(values)}
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
                          htmlFor="officeCountry"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Country
                        </label>
                        <div className="border w-full flex items-center">
                          <Field
                            name="officeCountry"
                            type="text"
                            readOnly={true}
                            placeholder="Select a country"
                            className="border-[#D9D9D9] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950 w-full relative"
                          />
                          <div className="w-[15%] border  cursor-pointer  h-full flex items-center justify-center">
                            <RxCaretDown
                              className="text-2xl  "
                              onClick={showCountryList}
                            />
                          </div>
                        </div>

                        <AnimateDropdown isVisible={isCountryListVisible}>
                          <article className="absolute border  text-xs flex-col rounded-md w-[300px] bg-white  transition-transform shadow-sm z-30 ml-[-30px]  h-[200px] overflow-y-auto ">
                            <div>
                              <input
                                value={keyWord}
                                onChange={handleKeywordChange}
                                
                                placeholder="Search Country..."
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
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="phoneNumber"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Phone Number
                        </label>
                        <div className="w-full flex items-center ">
                          <input
                            value={dialCode}
                            readOnly={true}
                            onChange={(e) => setDialCode(e.target.value)}
                            className="text-center border h-full w-[15%] text-[#8C8C8C] text-xs focus:outline-none"
                          />

                          <Field
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter Phone Number"
                            className="border-[#D9D9D9] border-[1px] border-l-0 border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] w-[85%] rounded-l-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="phoneNumber" />
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                        <label
                          htmlFor="officeAddress"
                          className="text-[#8C8C8C] text-sm"
                        >
                          Office Address
                        </label>
                        <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                          <Field
                            name="officeAddress"
                            type="text"
                            placeholder="Enter Office Address"
                            className="bg-white w-full h-full outline-none"
                          />
                        </div>
                        <span className="text-red-500 text-xs">
                          <ErrorMessage name="officeAddress" />
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
                    <div className="w-screen fixed flex justify-center left-0 top-[80px] z-50">
                      <div className="w-[784px] fixed px-[100px] flex justify-end">
                        <button
                          type="submit"
                          className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white text-[14px]"
                        >
                          Add User
                        </button>
                      </div>
                    </div>
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
