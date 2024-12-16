"use client";

// next

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, ErrorMessage, Field } from "formik";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import * as Yup from "yup";

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
      <section className=" items-center flex justify-center bottom-0 right-0 top-0 left-0 ">
        <article className="mt-16 lg:w-[40%] h-[75%] flex flex-col justify-center gap-y-4 py-10 border shadow-md rounded-md px-8 mb-10">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl font-bold">Register</h2>
            <Link href="/auth/login">
              <span className="text-sm text-[#2c698d]">
                Already have an account?
              </span>
            </Link>
          </div>

          <Form className="flex flex-col rounded-md">
            <article className="grid grid-cols-2 gap-x-4 justify-between w-full">
              <div className="flex flex-col gap-y-2 ">
                <label htmlFor="firstname"> First Name</label>
                <Field
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="firstname" />
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <label htmlFor="lastname"> Last Name</label>
                <Field
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="lastname" />
                </span>
              </div>
            </article>
            <article className="grid grid-cols-2 gap-x-4 justify-between w-full">
              <div className="flex flex-col gap-y-2 ">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="username" />
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="phoneNumber" />
                </span>
              </div>
            </article>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </span>
            </div>

            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="officeAddress">Office Address</label>
              <Field
                name="officeAddress"
                type="text"
                placeholder="Office Address"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="officeAddress" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="password">Password</label>
              <div className=" flex justify-between items-center border focus:outline-none px-1 text-xs h-8 rounded-sm">
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
            <div className="grid grid-rows-3 ">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className=" flex justify-between items-center border focus:outline-none px-1 text-xs h-8 rounded-sm">
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
            <div className="flex justify-between text-sm ">
              <span>Keep me signed in</span>
              <span>Forgot password</span>
            </div>
            <AnimateButton>
              <button
                type="submit"
                className="w-full border block h-10 bg-[#2c698d] text-white rounded-md mt-4"
              >
                Register
              </button>
            </AnimateButton>
          </Form>
        </article>
      </section>
    </Formik>
  );
}
