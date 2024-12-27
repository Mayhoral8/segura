"use client";

// next
import { useContext, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useRouter } from "next/navigation";
import { Form, Formik, ErrorMessage, Field } from "formik";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorModal from "../../../components/ErrorModal";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import * as Yup from "yup";

export default function SignInForm() {
  const { spinner, errorModal } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const { setShowErrorModal, setErrorMsg } = errorModal;
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });

  return (
    <>
      <ErrorModal />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setShowSpinner(true);
          try {
            const response = await signIn("credentials", {
              redirect: false, // Prevent automatic redirection
              email: values.email,
              password: values.password,
            });

            console.log(response);
            if (!response.ok) {
              // Handle the error (e.g., display an error message to the user)
              console.log(response.error);
              throw new Error(response.error);
            }

            const permissions = session?.user?.permissions || [];
            const isCorporateAdmin = permissions.find(
              (permission) => permission.name === "PERMISSION_CORPORATE_CREATE"
            );

            
            router.push("/corporate-admin/start-here");
            
            setShowSpinner(false);
          } catch (error) {
            console.log(error);
            console.log(error.message);
            setShowSpinner(false);
            setShowErrorModal(true);
            setErrorMsg(error.message); // Handle unexpected errors
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <section className="  items-center flex justify-center w-full h-full">
          <article className=" lg:w-[70%] h-full flex flex-col justify-center gap-y-4 py-10 px-8">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl font-bold">Login</h2>
            </div>

            <Form className="flex flex-col rounded-md ">
              <div className="grid grid-rows-3 ">
                <label htmlFor="email"> Email</label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="email" />
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
              <div className="flex justify-between text-sm ">
                <span>Keep me signed in</span>
                <Link href="/auth/forgot-password" className="text-[#2c698d]">
                  <span>Forgot password</span>
                </Link>
              </div>
              <AnimateButton>
                <button
                  type="submit"
                  className="w-full border block h-8 bg-[#2c698d] text-white rounded-sm mt-4"
                >
                  Login
                </button>
              </AnimateButton>
            </Form>
            <div className="flex items-center justify-center">
              <Link href="/auth/register">
                <span className="text-sm text-center text-[#2c698d]">
                  Don&apos;t have an account?
                </span>
              </Link>
            </div>
            <article className="grid grid-cols-3 gap-x-4">
              <div className="border  flex items-center justify-center gap-x-2 py-1 ">
                <FcGoogle />
                <span>Google</span>
              </div>
              <div className="border  flex items-center justify-center gap-x-2 py-1 ">
                <FaSquareXTwitter />
                <span>Twitter</span>
              </div>
              <div className="border  flex items-center justify-center gap-x-2 py-1 ">
                <GrFacebookOption className="text-blue-600" />
                <span>Facebook</span>
              </div>
            </article>
          </article>
        </section>
      </Formik>
    </>
  );
}
