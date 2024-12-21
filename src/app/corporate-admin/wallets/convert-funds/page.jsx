import React from "react";
import TableComponent from "../../../../components/Table";
import { Form, Formik, ErrorMessage, Field } from "formik";

const ConvertFunds = () => {
  const tableHeaders = ["Currency", "Buying", "Selling"];
  const tableValues = [
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
  ];

  return (
    <main className=" flex bg-white  mt-4 mb-4 min-h-[800px]">
      <section className="w-[40%] flex flex-col mx-auto justify-center gap-y-10 px-8 border-r">


        <article>
          <span>Exchange Rate</span>
          <TableComponent
            tableHeaders={tableHeaders}
            tableValues={tableValues}
          />
        </article>
      </section>
      <section className="flex flex-col items-center w-[60%] px-10">
        <span className="text-center">Convert Money</span>
        {/* <Form>

        </Form> */}
        <div>
          <button>Cancel</button>
          <button>Convert</button>
        </div>
      </section>
    </main>
  );
};

export default ConvertFunds;
// {
//   sendMoneyCtg.beneficiaries === true ? <Beneficiaries /> : <NewTransfer />;
// }
