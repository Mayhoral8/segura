"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// assets import
import LeftArrow from "../../../../assets/adminDashboard/arrowback.svg";
import Image from "next/image";
import NGFlag from "../../../../assets/adminDashboard/NGFlag.svg";
import USFlag from "../../../../assets/adminDashboard/UsFlag.svg";
import UkFlag from "../../../../assets/adminDashboard/UkFlag.svg";

const CardTopUpmodal = ({ toggleCardTopUpModal, handleCardTopUpModal }) => {
  const [selectedWallet, setSelectedWallet] = useState("Naira Wallet");
  const initialValues = {
    amount: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    pin: "",
    designatedWallet: "Naira Wallet",
  };

  const wallets = [
    { name: "Naira Wallet", flag: NGFlag },
    { name: "USD Wallet", flag: USFlag },
    { name: "EURO Wallet", flag: UkFlag },
  ];

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be 3 digits"),
    pin: Yup.string()
      .required("Card pin is required")
      .matches(/^\d{4}$/, "PIN must be 4 digits"),
  });

  const handleSubmit = (values) => {
    alert("Form submitted successfully");
    console.log(values);
  };

  return (
    <>
      {toggleCardTopUpModal && (
        <div className="flex absolute flex-col items-center bg-white w-full px-[100px]">
          <div
            className="absolute left-[70px] top-[25px] cursor-pointer"
            onClick={() => handleCardTopUpModal()}
          >
            <Image src={LeftArrow} alt="close" />
          </div>
          <div className="w-full bg-white p-6">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-xl font-semibold leading-none">
                Top Up With Card
              </h1>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Credit your wallet using your debit or credit card. Enter desired
              amount and card details.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount you wish to add
                  </label>
                  <Field
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="1,000.00"
                    className="mt-1 h-[40px] border-[1px] text-[14px] placeholder:text-[14px] px-2 w-full rounded-md border-[#D9D9D9]"
                  />
                  <ErrorMessage
                    name="amount"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <Field
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    className="mt-1 h-[40px] border-[1px] text-[14px] placeholder:text-[14px] px-2 w-full rounded-md border-[#D9D9D9]"
                  />
                  <ErrorMessage
                    name="cardNumber"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </label>
                    <Field
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="mt-1 h-[40px] border-[1px] text-[14px] placeholder:text-[14px] px-2 w-full rounded-md border-[#D9D9D9]"
                    />
                    <ErrorMessage
                      name="expiryDate"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <Field
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="000"
                      className="mt-1 h-[40px] border-[1px] text-[14px] placeholder:text-[14px] px-2 w-full rounded-md border-[#D9D9D9]"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                {/* Card PIN */}
                <div>
                  <label
                    htmlFor="pin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Card Pin
                  </label>
                  <Field
                    type="password"
                    id="pin"
                    name="pin"
                    placeholder="****"
                    className="mt-1 h-[40px] border-[1px] text-[14px] placeholder:text-[14px] px-2 w-full rounded-md border-[#D9D9D9]"
                  />
                  <ErrorMessage
                    name="pin"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Wallet Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Choose Designated Wallet
                  </h3>
                  <div className="flex space-x-4">
                    {wallets.map((wallet) => (
                      <div
                        key={wallet.name}
                        onClick={() => setSelectedWallet(wallet.name)}
                        className={`flex items-center justify-center h-[40px] border w-[120px] rounded-lg text-sm font-medium 
            ${
              selectedWallet === wallet.name
                ? "border-[#2C698D] bg-[#E3F6F5]"
                : "border-[#F0F0F0] bg-white"
            } transition`}
                      >
                        <Image
                          className="text-xl mr-2"
                          src={wallet.flag}
                          alt="flag"
                        />
                        {wallet.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="h-[36px] grid place-items-center w-[200px] border rounded-md bg-[#F5F5F5] text-[#BFBFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-[36px] grid place-items-center w-[200px] rounded-md text-white bg-[#2C698D]"
                  >
                    Confirm
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default CardTopUpmodal;
