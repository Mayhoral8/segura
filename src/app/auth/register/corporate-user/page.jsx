"use client";

// next
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../../contexts/ConfigContext";
import { Form, Formik, ErrorMessage, Field, useFormikContext } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorModal from "../../../../components/ErrorModal";
import * as Yup from "yup";
import Image from "next/image";
import BackgroundImage from "../../../../assets/adminDashboard/setupPasswordBG.svg";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());
  const token = currentParams.get("token");

  const { spinner, errorModal } = useContext(ConfigContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

  // has mix of small and capitals
  const hasMixed = (number) =>
    new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

  // has special chars
  const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const TrackPassword = () => {
    const [passwordValidation, setPasswordValidation] = useState({
      hasNumber: false,
      isUppercase: false,
      isLowercase: false,
      hasSpecial: false,
      isTooShort: false,
      isTooLong: false,
    });
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
      const password = values.password || "";

      setPasswordValidation({
        hasNumber: hasNumber(password),
        isUppercase: new RegExp(/[A-Z]/).test(password), //
        isLowercase: new RegExp(/[a-z]/).test(password), //
        hasSpecial: hasSpecial(password),
        isTooShort: password.length >= 8,
        isTooLong: password.length <= 20,
      });
    }, [values.password]);

    return (
      <>
        {/* Password Rules */}
        {passwordFocused && (
          <div className="bg-[#F0F3FF] p-3 rounded-lg shadow-md text-sm absolute w-full top-[70px] ">
            <ul className="list-disc pl-2">
              <li>
                <span
                  className={
                    passwordValidation.isTooShort
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  Minimum 8 characters
                </span>
              </li>
              <li>
                <span
                  className={
                    passwordValidation.isTooLong
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  Maximum 20 characters
                </span>
              </li>
              <li>
                <span
                  className={
                    passwordValidation.isLowercase
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  At least 1 lowercase letter (a-z)
                </span>
              </li>
              <li>
                <span
                  className={
                    passwordValidation.isUppercase
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  At least 1 uppercase letter (A-Z)
                </span>
              </li>
              <li>
                <span
                  className={
                    passwordValidation.hasNumber
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  At least 1 number (0-9)
                </span>
              </li>
              <li>
                <span
                  className={
                    passwordValidation.hasSpecial
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  At least 1 symbol (%&@, etc.)
                </span>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  };

  const schema = Yup.object().shape({
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

  return (
    <>
      <ErrorModal />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/setupPassword`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization-Token": token,
                },
              }
            );
            const responseData = await response.json();

            if (!response.ok) {
              throw new Error(responseData.responseMessage);
            }
          } catch (err) {
            toast.error(err.message);
          }
        }}
      >
        {({ setFieldValue }) => (
          <section className="relative flex justify-center w-screen h-screen items-center">
            <Image
              src={BackgroundImage}
              alt="background image"
              className="absolute w-full"
            />
            <article className=" w-[500px] h-max flex flex-col justify-center gap-y-4 py-10 px-8 relative z-50 bg-white">
              <div className="flex justify-between items-center ">
                <h2 className="text-2xl font-bold">Set up your password</h2>
              </div>
              <Form className="flex flex-col rounded-md ">
                <div className="relative">
                  <div className="mb-3 w-full text-[#8C8C8C]">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <div className="flex bg-white justify-between items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full h-full focus:outline-none text-black"
                        placeholder="Enter your password"
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
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
                  <TrackPassword />
                </div>

                <div className="grid mb-6">
                  <label htmlFor="confirmPassword" className="text-sm">
                    Confirm Password
                  </label>
                  <div className="flex justify-between bg-white items-center border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full h-full focus:outline-none text-black"
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
                <button
                  type="submit"
                  className="w-full border block h-8 bg-[#2c698d] text-white rounded-sm"
                >
                  Save Password
                </button>
              </Form>
            </article>
          </section>
        )}
      </Formik>
    </>
  );
}
