"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import AccTable from "@/app/corporate/accounts/accTables";
import AccountViewModal from "@/app/corporate/accounts/AccountViewModal";
import { CiSearch } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";

const Page = () => {
  const { showAccountDetailsModal, setShowAccountDetailsModal } =
    useContext(ConfigContext);
  const [searchInput, setSearchInput] = useState("");

  function createData(id, accNo, name, accBalance, currency, status) {
    return { id, accNo, name, accBalance, currency, status };
  }

  const initialRows = [
    createData(1, "1234567890", "Mayowa", 50000, "NGN", "Active"),
    createData(2, "9876543210", "Jane Doe", 20000, "NGN", "Blocked"),
    createData(3, "1122334455", "John Smith", 135000, "NGN", "Active"),
    createData(4, "6677889900", "David Mark", 42300, "NGN", "Active"),
    createData(5, "4433221100", "Alex Johnson", 50000, "NGN", "Blocked"),
    createData(6, "9988776655", "Mary Jane", 31000, "NGN", "Active"),
    createData(7, "5566778899", "Mike Brown", 8600, "NGN", "Active"),
    createData(8, "3344556677", "Anna Lee", 10000, "NGN", "Blocked"),
    createData(9, "2233445566", "Chris Paul", 44000, "NGN", "Active"),
    createData(10, "7788990011", "Tim Cook", 73200, "NGN", "Active"),
  ];
  const [rows, setRows] = useState(initialRows);

  const filterTable = (accNo) => {
    const newRows = rows.filter((account) => {
      return account.accNo === accNo;
    });
    setRows(newRows);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    e.target.value && setRows(initialRows);
  };

  useEffect(() => {
    if (searchInput === "") {
       setRows(initialRows);
    }else{
      setTimeout(()=>{
        filterTable(searchInput);
      }, 2000)
    }
  }, [searchInput]);

  // Function to create account data

  return (
    <div className={`${showAccountDetailsModal && "overflow-hidden"}`}>
      <section className="flex flex-row justify-between px-10">
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
        <article className="flex flex-row gap-x-4 items-center">
          <span>Search account number</span>
          <div className="flex flex-row">
            <input
              placeholder={`account number`}
              className="border w-36 h-8 focus:outline-none px-2"
              value={searchInput}
              onChange={handleSearchInput}
            />
          </div>
        </article>
      </section>

      <AccTable rows={rows} />
      <AccountViewModal />
    </div>
  );
};

export default Page;
