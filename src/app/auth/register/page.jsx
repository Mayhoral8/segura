"use client";

// next
import React from "react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, ErrorMessage, Field } from "formik";
// import AnimateButton from "../../../components/@extended/AnimateButton";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorModal from "../../../components/ErrorModal";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { countryData } from "../../../config/countryData";
import { AnimateDropdown } from "../../../components/Animate";
import { RxCaretDown } from "react-icons/rx";
// asset import
import Logo from "@/assets/auth/logo.svg";
import Symbol from "@/assets/auth/seguraSymbol.svg";

// material-ui
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

import * as Yup from "yup";
import Image from "next/image";
import { toast } from "sonner";

export default function SignIn() {
  const { spinner, errorModal } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const { setShowErrorModal, setErrorMsg } = errorModal;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isCountryListVisible, setIsCountryListVisible] = useState(false);
  const [dialCode, setDialCode] = useState("+1");

  const [previousLocation, setPreviousLocation] = useState("");
  const [countries, setCountries] = useState(countryData);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCountryChange = (keyword) => {
    setCountries(() => {
      return countries.filter((country) => {
        return country.name.startsWith(keyword);
      });
    });
  };
  const [keyWord, setkeyWord] = useState("");

  const handleInputChange = () => {
    setkeyWord(e.target.value);
  };

  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) setPreviousLocation(lastVisitedPage);
    if (status !== "unauthenticated") {
      router.push(previousLocation); // Perform navigation after render
    }
  }, [status, previousLocation, router]);

  const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

  // has mix of small and capitals
  const hasMixed = (number) =>
    new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

  // has special chars
  const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

  const initialValues = {
    businessName: "",
    email: "",
    phoneNumber: "",
    officeCountry: "",
    password: "",
    confirmPassword: "",
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeywordChange = (e) => {
    setkeyWord(e.target.value);
    setCountries(() => {
      return countryData.filter(({ name }, i) => {
        return name.toUpperCase().startsWith(e.target.value.toUpperCase());
      });
    });
  };
  const showCountryList = () => {
    setIsCountryListVisible(!isCountryListVisible);
  };
  const schema = Yup.object().shape({
    businessName: Yup.string().max(30).required("Business name is required"),
    // firstname: Yup.string().max(255).required("First Name is required"),
    // lastname: Yup.string().max(255).required("Last Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    // homeAddress: Yup.string()
    //   .max(255)
    //   .required("Home address is required"),
    officeCountry: Yup.string().max(255).required("Office country is required"),
    phoneNumber: Yup.string()
      .max(24, "Phone number can not be more than 24 characters")
      .min(8, "Phone Number must be at least 8 characters")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be between 8 to 20 characters")
      .max(20, "Password must be between 8 to 20 characters")
      .required("Password is required")
      .test(
        "no-leading-trailing-whitespace",
        "Password cannot start or end with spaces",
        (value) => value === value.trim()
      )
      .test(
        "has-special-char",
        "Password must contain at least one special character",
        (value) => value && hasSpecial(value)
      )
      .test(
        "has-mixed", // Name of the test
        "Password must contain lower and upper case letter(s)", // Error message
        (value) => value && hasMixed(value) // Validation logic
      )
      .test(
        "has-number", // Name of the test
        "Password must contain a number", // Error message
        (value) => value && hasNumber(value) // Validation logic
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  if (status === "unauthenticated") {
    return (
      <div className="flex">
        <ErrorModal />
        <div className="h-screen bg-[#272643] w-[35%] relative flex flex-col justify-between p-5 text-white overflow-hidden">
          <div className="relative z-10">
            <Image src={Logo} alt="segura logo" />
          </div>
          <div className="relative z-10">
            <h3 className="font-semibold mb- text-[50px]">Create an account</h3>
            <p className="text-[#D9D9D9] max-w-[400px]">
              Join now to experience secure, scalable and innovative banking
              tailored to your business needs.
            </p>
            <div className="text-[18px] mt-5 mb-3 font-bold">
              Password recommendations
            </div>
            <ul className="list-disc ml-5">
              <li>Minimum 8 characters</li>
              <li>Maximum 20 characters</li>
              <li>
                <span className="text-green-500">
                  At least 1 lowercase (a - z)
                </span>
              </li>
              <li>
                <span className="text-green-500">
                  At least 1 uppercase (A - Z)
                </span>
              </li>
              <li>At least 1 number (0 - 8)</li>
              <li>At least 1 symbol (%, &, @, etc.)</li>
            </ul>
          </div>
          <div className="mx-auto justify-self-center relative z-10">
            <p className="text-[#8C8C8C] text-[12px]">
              This site is protected by RE-CAPTCHA and the Google{" "}
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
          <div className="absolute z-0 bottom-[0px] -right-24">
            <Image src={Symbol} alt="symbol" className="scale-75 opacity-40" />
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("p");
            const trimmedEmail = values.email.trim();
            setShowSpinner(true);
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/registerCorporateAdmin`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    businessName: values.businessName,
                    email: trimmedEmail,
                    officeCountry: values.officeCountry,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                  }),
                  headers: {
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
              toast.success("Registration successful");
              router.push("/auth/login");
            } catch (err) {
              console.log(err.message);
              setShowSpinner(false);
              setShowErrorModal(true);
              setErrorMsg(err.message);
            }
          }}
        >
          {({ setFieldValue }) => (
            <section className="items-center h-screen w-[65%]  flex justify-center bottom-0 right-0 top-0 left-0 relative">
              <article className="h-full w-[620px] flex flex-col justify-center gap-y-4 py-10 px-8">
                <div className="flex justify-between items-center ">
                  <h2 className="text-2xl font-bold">Sign Up</h2>
                </div>

                <Form className="flex flex-col rounded-md">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label
                        htmlFor="businessName"
                        className="text-[#8C8C8C] text-sm"
                      >
                        Business/Company Name
                      </label>
                      <Field
                        name="businessName"
                        type="text"
                        placeholder="Enter company name"
                        className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                      />
                      <span className="text-red-500 text-xs">
                        <ErrorMessage name="businessName" />
                      </span>
                    </div>
                    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                      <label htmlFor="email" className="text-[#8C8C8C] text-sm">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                      />
                      <span className="text-red-500 text-xs">
                        <ErrorMessage name="email" />
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
                          placeholder="Enter or select a country"
                          className="border-[#D9D9D9] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] text-gray-950 w-full"
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
                              className="border w-[300px] fixed mb-5 h-10 focus:outline-none px-1 "
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
                                    setFieldValue("officeCountry", countryName),
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
                          onChange={(e) => setDialCode(e.target.value)}
                          className="text-center border h-full w-[15%] text-[#8C8C8C] text-xs"
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
                    <div className="mb-3 w-[48%] text-[#8C8C8C]">
                      <label htmlFor="password" className="text-sm">
                        Password
                      </label>
                      <div className="flex bg-white justify-between items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="w-full h-full focus:outline-none"
                          placeholder="Enter your password"
                        />
                        {showPassword ? (
                          <IoMdEyeOff
                            className="text-lg cursor-pointer"
                            onClick={handleShowPassword}
                          />
                        ) : (
                          <IoMdEye
                            className="text-lg cursor-pointer"
                            onClick={handleShowPassword}
                          />
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                    <div className="mb-2 w-[48%] text-[#8C8C8C]">
                      <label htmlFor="confirmPassword" className="text-sm">
                        Confirm Password
                      </label>
                      <div className="flex justify-between bg-white items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full h-full focus:outline-none"
                          placeholder="Confirm Password"
                        />
                        {showConfirmPassword ? (
                          <IoMdEyeOff
                            className="text-lg cursor-pointer"
                            onClick={handleShowConfirmPassword}
                          />
                        ) : (
                          <IoMdEye
                            className="text-lg cursor-pointer"
                            onClick={handleShowConfirmPassword}
                          />
                        )}
                      </div>
                      <span className="text-red-500 text-xs">
                        <ErrorMessage name="confirmPassword" />
                      </span>
                    </div>
                  </div>
                  {/* <AnimateButton> */}
                  <button
                    type="submit"
                    className="border block h-9 w-[200px] bg-[#2c698d] text-white rounded-[4px] mt-2 ml-auto justify-self-end"
                  >
                    Next
                  </button>
                  {/* </AnimateButton> */}
                  <Link
                    href="/auth/login"
                    className="mt-10 mx-auto justify-self-center"
                  >
                    <span className="text-sm text-[#2c698d]">
                      Already have an account?
                      <span className="font-semibold"> Login</span>
                    </span>
                  </Link>
                </Form>
              </article>
              <div className="flex items-center absolute bottom-[20px] gap-[40px]">
                <p className="text-[#8C8C8C] text-[12px] underline">
                  Terms and Conditions
                </p>
                <p className="text-[#8C8C8C] text-[12px] underline">
                  Privacy Policy
                </p>
                <p className="text-[#8C8C8C] text-[12px] underline">
                  CA Privacy Notice
                </p>
              </div>
            </section>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed ">
        <CgSpinner className=" text-6xl animate-spin text-[#2c698d] " />
      </div>
    );
  }
}
