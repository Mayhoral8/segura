"use client";

// next
import { useContext, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, ErrorMessage, Field } from "formik";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// material-ui
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

import * as Yup from "yup";

export default function SignIn() {
  const { setShowSpinner } = useContext(ConfigContext).spinner;
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (status === "authenticated") {
      // Debugging session and permissions

      const permissions = session?.user?.permissions || [];

      // Adjusted to check for permissions array of objects
      const isCorporateAdmin = permissions.some(
        (permission) => permission.name === "PERMISSION_CORPORATE_CREATE"
      );

      if (isCorporateAdmin) {
        router.push("/corporate-admin/dashboard");
      } else {
        router.push("/corporate/dashboard");
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <CgSpinner className="animate-spin text-5xl text-[#2c698d]" />
      </div>
    );
  }

  const initialValues = {
    username: "",
    password: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string().max(255).required("Username is required"),
    password: Yup.string().max(255).required("Password is required"),
  });
  if (status === "unauthenticated") {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          setShowSpinner(true);
          signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
          });
          setShowSpinner(false);
        }}
      >
        <section className="fixed  items-center flex justify-center bottom-0 right-0 top-0 left-0 ">
          <article className=" lg:w-[35%] h-[75%] flex flex-col justify-center gap-y-4 py-10 border shadow-md rounded-md px-8">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl font-bold">Login</h2>
              <Link href="/auth/register">
                <span className="text-sm text-[#2c698d]">
                  Don't have an account?
                </span>
              </Link>
            </div>

            <Form className="flex flex-col rounded-md ">
              <div className="grid grid-rows-3 ">
                <label htmlFor="username"> Username</label>
                <Field
                  name="username"
                  type="text"
                  className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="username" />
                </span>
              </div>

              <div className="grid grid-rows-3 ">
                <label htmlFor="password">Password</label>
                <div className=" flex justify-between items-center border focus:outline-none px-1 text-xs h-8 rounded-sm">
                  <Field name="password" type={showPassword ? "text" : "password"} className="w-full h-full focus:outline-none" />
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
                <span>Forgot password</span>
              </div>
              <AnimateButton>
                <button
                  type="submit"
                  className="w-full border block h-8 bg-[#2c698d] text-white rounded-md mt-4"
                >
                  Login
                </button>
              </AnimateButton>
            </Form>
          </article>
        </section>
      </Formik>
    );
  }
}
