import React from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const InternationalTransfer = () => {
  const initialValues = {
    amount: "",
    country: "",
    recipientAccNo: "",
    recpientName: "",
    bankName: "",
    swiftCode: "",
    txnDescription: "",
  };
  const schema = Yup.object().shape({
    amount: Yup.string().max(255).required("Amount is required"),
    country: Yup.string().max(30).required("Country is required"),
    recipientAccNo: Yup.string()
      .max(255)
      .required("Recipient account no is required"),
    recpientName: Yup.string().max(255).required("Recipient name is required"),
    bankName: Yup.string().max(255).required("Bank name is required"),
    swiftCode: Yup.string().max(20).required("Swift Code/BIC is required"),
    txnDescription: Yup.string()
      .max(255)
      .required("Transaction Description is required"),
  });
  return (
    <div className="w-full flex justify-center">
      <Formik initialValues={initialValues} validationSchema={schema}>
        <section className="w-[80%] text-sm mt-8">
          <Form className="flex flex-col w-full">
            <div className="grid grid-rows-3 ">
              <label htmlFor="amount"> Amount you wish to send</label>
              <Field
                name="amount"
                type="text"
                placeholder="Enter Amount"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="amount" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="country"> Country</label>
              <Field
                name="country"
                type="text"
                placeholder="Select Country"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="country" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="recipientAccNo"> Recipients account number</label>
              <Field
                name="recipientAccNo"
                type="text"
                placeholder="Enter recipient account number"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="recipientAccNo" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="recpientName"> Recipients name</label>
              <Field
                name="recpientName"
                type="text"
                placeholder="Enter recipient name"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="recpientName" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="bankName"> Bank name</label>
              <Field
                name="bankName"
                type="text"
                placeholder="Enter bank name"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="bankName" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="swiftCode"> SWIFT/BIC code</label>
              <Field
                name="swiftCode"
                type="text"
                placeholder="Enter Swift Code/BIC"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="swiftCode" />
              </span>
            </div>
            <div className="grid grid-rows-3 ">
              <label htmlFor="txnDescription">Transaction Description</label>
              <Field
                name="txnDescription"
                type="text"
                placeholder="Enter Description"
                className="border focus:outline-none px-1 text-xs h-8 rounded-sm"
              />
              <span className="text-red-500 text-xs">
                <ErrorMessage name="txnDescription" />
              </span>
            </div>
            <div className="rounded flex justify-between items-center px-2 bg-[#FAFAFA] py-2">
              <span>Charges fee</span>
              <span>#10.00</span>
            </div>

            <div className="flex justify-between gap-x-2 mt-4">
              <button className="w-[50%] py-2 bg-[#D9D9D9]">Cancel</button>
              <button className="w-[50%] bg-[#2C698D] text-white py-2">
                Send Money
              </button>
            </div>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default InternationalTransfer;
