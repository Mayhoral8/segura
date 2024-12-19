"use client";

// next

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, ErrorMessage, Field } from "formik";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// asset import
import Logo from "@/assets/auth/logo.svg";
import Symbol from "@/assets/auth/seguraSymbol.svg";
import Google from "@/assets/auth/Google.svg";
import Twitter from "@/assets/auth/Twitter.svg";
import Facebook from "@/assets/auth/Facebook.svg";

// material-ui
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

import * as Yup from "yup";
import Image from "next/image";

export default function SignIn() {
  const { spinner, errorModal } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const { setShowErrorModal, setErrorMsg } = errorModal;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    officeAddress: "",
    confirmPassword: "",
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const schema = Yup.object().shape({
    username: Yup.string().max(12).required("Username is required"),
    firstname: Yup.string().max(255).required("First Name is required"),
    lastname: Yup.string().max(255).required("Last Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    // homeAddress: Yup.string()
    //   .max(255)
    //   .required("Home address is required"),
    officeAddress: Yup.string().max(255).required("Office address is required"),
    phoneNumber: Yup.string().max(13).required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .test(
        "no-leading-trailing-whitespace",
        "Password cannot start or end with spaces",
        (value) => value === value.trim()
      )
      .max(10, "Password must be less than 10 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  return (
    <div className="flex">
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
          <Image src={Symbol} className="scale-75 opacity-40" />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const trimmedEmail = values.email.trim();
          setShowSpinner(true);
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/registerCorporateAdmin`,
              {
                method: "POST",
                body: JSON.stringify({
                  firstName: values.firstname,
                  lastName: values.lastname,
                  email: trimmedEmail,
                  username: values.username,
                  phoneNumber: values.phoneNumber,
                  officeAddress: values.officeAddress,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  permissionLists: [
                    "PERMISSION_ACCOUNT_CREATE",
                    "PERMISSION_USER_VIEW",
                    "PERMISSION_CORPORATE_CREATE",
                  ],
                  corporateId: "12345",
                  isCorporate: "true",
                  isVerified: "false",
                  userStatus: "INACTIVE",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              setShowSpinner(false);
              const responseData = await response.json();
              console.log(responseData);
              toast.success("Registration successful");
              router.push("/auth/login");
            } else {
              setShowSpinner(false);
              setShowErrorModal(true);
              setErrorMsg(response.error);
            }
          } catch (err) {
            setShowSpinner(false);
            setShowErrorModal(true);
            setErrorMsg(response.error);
          }
        }}
      >
        <section className="items-center h-screen w-[65%]  flex justify-center bottom-0 right-0 top-0 left-0 relative">
          <article className="h-full w-[620px] flex flex-col justify-center gap-y-4 py-10 px-8">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl font-bold">Sign Up</h2>
            </div>

            <Form className="flex flex-col rounded-md">
              <div className="flex w-full justify-between">
                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label
                    htmlFor="officeAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Business/Company Name
                  </label>
                  <Field
                    name="company name"
                    type="text"
                    placeholder="Enter company name"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="company name" />
                  </span>
                </div>
                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label
                    htmlFor="company size"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Business/Company Size
                  </label>
                  <div className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                    <Field
                      name="company size"
                      as="select"
                      className="bg-white w-full h-full outline-none"
                    >
                      <option value="red">Select</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </Field>
                  </div>
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="business size" />
                  </span>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label
                    htmlFor="companyAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Country
                  </label>
                  <Field
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="companyAddress" />
                  </span>
                </div>
                <div className="flex flex-col w-[48%] gap-y-2 mb-2">
                  <label
                    htmlFor="companyAddress"
                    className="text-[#8C8C8C] text-sm"
                  >
                    Phone Number
                  </label>
                  <Field
                    name="country"
                    type="text"
                    placeholder="Enter country"
                    className="border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
                  />
                  <span className="text-red-500 text-xs">
                    <ErrorMessage name="country" />
                  </span>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="mb-3 w-[48%] text-[#8C8C8C]">
                  <label htmlFor="password">Password</label>
                  <div className="flex bg-white justify-between items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full h-full focus:outline-none"
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
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="flex justify-between bg-white items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full h-full focus:outline-none"
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
              <AnimateButton>
                <button
                  type="submit"
                  className="border block h-9 w-[200px] bg-[#2c698d] text-white rounded-[4px] mt-2 ml-auto justify-self-end"
                >
                  Next
                </button>
              </AnimateButton>
              <Link
                href="/auth/login"
                className="mt-10 mx-auto justify-self-center"
              >
                <span className="text-sm text-[#2c698d]">
                  Already have an account?
                  <span className="font-semibold text-base"> Login</span>
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
      </Formik>
    </div>
  );
}
