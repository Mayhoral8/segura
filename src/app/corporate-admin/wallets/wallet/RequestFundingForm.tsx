"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AnimateModal } from "@/components/Animate";
import * as Yup from "yup";

type Values = {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  country: string;
  city: string;
};
const RequestFundingForm = ({prevStep}) => {
  const handleFormIndex = ()=>{
    prevStep()
  }
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        middleName: "",
        phoneNumber: "",
        country: "",
        city: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(15, "must be 15 characters or less")
          .required("Required"),
        middleName: Yup.string()
          .max(15, "must be 15 characters or less")
          .required("Required"),
        phoneNumber: Yup.string()
          .length(11, "Must be 11 digits")
          .required("Required"),
        country: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
      })}
      onSubmit={(values: Values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isValid }) => (
        <Form className="flex flex-col rounded-md h-[400px]">
          <article className="flex flex-row justify-between gap-x-4">
            <div className="grid grid-rows-3 ">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                type="text"
                className="border focus:outline-none px-1 text-xs"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="firstName" />
              </span>
            </div>

            <div className="grid grid-rows-3 ">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className="border focus:outline-none px-1 text-xs h-8"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="lastName" />
              </span>
            </div>
          </article>

          <article className="flex flex-row justify-between">
            <div className="grid grid-rows-3 ">
              <label htmlFor="middleName">Middle Name</label>
              <Field
                name="middleName"
                type="text"
                className="border focus:outline-none px-1 text-xs h-8"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="middleName" />
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
          </article>

          <article className="flex flex-row justify-between">
            <div className="grid grid-rows-3 ">
              <label htmlFor="country">Country</label>
              <Field
                name="country"
                type="text"
                className="border focus:outline-none px-1 text-xs h-8"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="country" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="city">City</label>
              <Field
                name="city"
                type="text"
                className="border focus:outline-none px-1 text-xs h-8"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="city" />
              </span>
            </div>
          </article>

          <div className="flex flex-row gap-x-2 justify-center">
            <button className="border px-2 py-2 w-20 border-[#2c698d] text-gray-950 rounded-md" onClick={handleFormIndex}>
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`border px-2 py-2 w-20 bg-[#2c698d] text-white rounded-md`}
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RequestFundingForm;
