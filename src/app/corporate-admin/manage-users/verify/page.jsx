"use client";

import React from "react";
import { FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { Gender } from "@/config";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "formik";
import Button from "@mui/material/Button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
// import { FaCloudUploadAlt } from "react-icons/fa";

import { useFormik } from "formik";
import _ from "lodash";
import * as Yup from "yup";

const Verify = () => {
  const { data: session, status } = useSession();
  const allBusinessTypes = [
    { value: 3, label: "Sole Proprietorship" },
    { value: 1, label: "Limited Liability Company" },
    { value: 2, label: "Partnership" },
  ];

  const getInitialValues = () => {
    const initialValues = {
      corporateName: "",
      rcNumber: "",
      tin: "",
      businessType: "",
      email: "",
      websiteUrl: "",
      industrySector: "",
      phoneNumber: "",
      businessAddress: "",
      operationalAddress: "",
      totalEmployees: "",
    };

    return initialValues;
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const schema = Yup.object().shape({
    corporateName: Yup.string()
      .max(255)
      .required("Registered Company Name is required"),
    rcNumber: Yup.string().max(255).required("Registered Number is required"),
    tin: Yup.string()
      .max(255)
      .required("Tax Identification number is required"),
    businessType: Yup.string().max(255).required("Business type is required"),
    websiteUrl: Yup.string().max(255).required("Website Url is required"),
    email: Yup.string()
      .max(255)
      .required("Email is required")
      .email("Must be a valid email"),
    phoneNumber: Yup.string().max(255).required("Phone Number is required"),
    businessAddress: Yup.string()
      .max(255)
      .required("Business address is required"),
    operationalAddress: Yup.string()
      .max(255)
      .required("Operational address is required"),
    totalEmployees: Yup.string().max(10).required("Total Employee is Required"),
    industrySector: Yup.string()
      .max(255)
      .required("Industry sector is required"),
  });

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);

        try {
          const response = await fetch(
            "https://api-dev.segura-pay.com/api/v1/onboarding",
            {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                authorization: `Bearer ${session?.user?.accessToken}`
              },
            }
          );
          if (response.ok) {
            const responseData = await response.json();
            toast.success("Details Submitted");
            console.log(responseData);
          }
        } catch (err) {
          console.log(err);
        }

        
        // setTimeout(() => {
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ isValid }) => (
        <Form className="flex flex-col rounded-md h-[400px] px-10">
          <h2 className="mb-5 text-2xl font-semibold">
            Basic Company Information
          </h2>
          <div className="grid grid-rows-3 ">
            <label htmlFor="corporateName"> Registered Company Name</label>
            <Field
              name="corporateName"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="corporateName" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="rcNumber">Registered Number</label>
            <Field
              name="rcNumber"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="rcNumber" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="tin">Tax Identification Number (TIN)</label>
            <Field
              name="tin"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="tin" />
            </span>
          </div>
          <div className="grid grid-rows-3 ">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field
              name="phoneNumber"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="phoneNumber" />
            </span>
          </div>

          <div className="grid grid-rows-3">
            <label htmlFor="businessType">Business Type</label>
            <Field
              name="businessType"
              as="select" // Use "select" to render a dropdown
              className="border focus:outline-none px-1 text-xs h-8"
            >
              <option value="" disabled>
                Select a business type
              </option>
              <option value="retail">Retail</option>
              <option value="services">Services</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="ecommerce">E-commerce</option>
            </Field>
            <span className="text-red-500 text-xs">
              <ErrorMessage name="businessType" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="industrySector">
              Industry Sector/Nature of Business
            </label>
            <Field
              name="industrySector"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="industrySector" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="email"> Official Email Address</label>
            <Field
              name="email"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="businessAddress">
              {" "}
              Registered Business Address
            </label>
            <Field
              name="businessAddress"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="businessAddress" />
            </span>
          </div>
          <div className="grid grid-rows-3 ">
            <label htmlFor="operationalAddress"> Operational Address</label>
            <Field
              name="operationalAddress"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="operationalAddress" />
            </span>
          </div>
          <div className="grid grid-rows-3 ">
            <label htmlFor="websiteUrl"> Website Url</label>
            <Field
              name="websiteUrl"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="websiteUrl" />
            </span>
          </div>

          <div className="grid grid-rows-3 ">
            <label htmlFor="totalEmployees"> Total Employees</label>
            <Field
              name="totalEmployees"
              type="text"
              className="border focus:outline-none px-1 text-xs h-8"
            />
            <span className="text-red-500 text-xs">
              <ErrorMessage name="totalEmployees" />
            </span>
          </div>

          <div className="flex flex-row gap-x-2 justify-center">
            <button
              type="submit"
              disabled={!isValid}
              className={`border px-2 py-2 w-20 bg-[#2c698d] text-white rounded-md`}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Verify;
