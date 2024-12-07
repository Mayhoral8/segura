"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import AccTable from "../../corporate/accounts/accTables";
import AccountViewModal from "../../corporate/accounts/AccountViewModal";
import { CiSearch } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
// import AccountTableOperations from "../../../components/AccountTableOperations";
import AccountTableOperations from "../../../components/TableOperations/AccountTableOperations" 


const Page = () => {
  const { showAccountDetailsModal } = useContext(ConfigContext);

  return (
    <div className={`${showAccountDetailsModal && "overflow-hidden"}`}>
      <section className="flex flex-row justify-between mx-10 bg-white px-4 rounded-md border py-2 items-center ">
        <article className=" rounded-md flex flex-row gap-x-4 ">
          <div className="flex flex-row items-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <div className="border rounded-sm py-1 px-1">
              <FaUsers />
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Total</span>
              <span className="font-semibold">12030</span>
            </div>
          </div>
          <div className="flex flex-row items-center  gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <div className="border rounded-sm py-1 px-1">
              <FaUserCheck />
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Active</span>
              <span className="font-semibold">11890</span>
            </div>
          </div>
        </article>
        <AccountTableOperations />
      </section>

      <AccTable />
      <AccountViewModal />
    </div>
  );
};

export default Page;
