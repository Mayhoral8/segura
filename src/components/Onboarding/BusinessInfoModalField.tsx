"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";

type Props = {
  name: string;
  placeholder: string;
  title: string;
  readonly: boolean;
};
const BusinessInfoModalField: React.FC<Props> = ({
  name,
  placeholder,
  title,
  readonly,
}) => {
  return (
    <div className="flex flex-col w-[48%] gap-y-2 mb-2">
      <label htmlFor={name} className="text-[#8C8C8C] text-sm">
        {title}
      </label>
      <Field
        name={name}
        type="text"
        readOnly={readonly}
        placeholder={placeholder}
        className={`border-[#D9D9D9]  border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px] border-[1px] ${
          readonly ? "text-[#8C8C8C] bg-gray-100" : ""
        }`}
      />
      <span className="text-red-500 text-xs">
        {<ErrorMessage name={name} />}
      </span>
    </div>
  );
};

export default BusinessInfoModalField;
