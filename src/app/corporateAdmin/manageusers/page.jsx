"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import AccTable from "@/app/corporateAdmin/manageusers/accTables";
import AccountViewModal from "@/app/corporateAdmin/manageusers/AccountViewModal";
import Link from "next/link";

const Page = () => {
  const { showAccountDetailsModal, setShowAccountDetailsModal } =
    useContext(ConfigContext);

  function createData(id, accNo, name, email, date, paymentStatus) {
    return { id, accNo, name, email, date, paymentStatus };
  }

  const initialRows = [
    createData(
      1,
      "1234567890",
      "Mayowa",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      2,
      "9876543210",
      "Jane Doe",
      "dev@example.com",
      "5-12-2022",
      "Blocked"
    ),
    createData(
      3,
      "1122334455",
      "John Smith",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      4,
      "6677889900",
      "David Mark",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      5,
      "4433221100",
      "Alex Johnson",
      "dev@example.com",
      "5-12-2022",
      "Blocked"
    ),
    createData(
      6,
      "9988776655",
      "Mary Jane",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      7,
      "5566778899",
      "Mike Brown",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      8,
      "3344556677",
      "Anna Lee",
      "dev@example.com",
      "5-12-2022",
      "Blocked"
    ),
    createData(
      9,
      "2233445566",
      "Chris Paul",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
    createData(
      10,
      "7788990011",
      "Tim Cook",
      "dev@example.com",
      "5-12-2022",
      "Active"
    ),
  ];
  const [rows, setRows] = useState(initialRows);

  const filterTable = (accNo) => {
    const newRows = rows.filter((account) => {
      return account.accNo === accNo;
    });
    setRows(newRows);
  };

  // Function to create account data

  return (
    <div className={`${showAccountDetailsModal && "overflow-hidden"}`}>
      <section className="flex flex-row justify-between px-10">
        <article className="">
          <div className="text-2xl font-semibold mb-5">Manage Users</div>
          <Link href="/corporateAdmin/addUser">
            <div className="mb-5">
              <button className="bg-[#2C698D] text-white p-3 rounded-md flex items-center">
                <span className="text-2xl mr-2">+</span> Add User
              </button>
            </div>
          </Link>
        </article>
      </section>

      <AccTable rows={rows} />
      <AccountViewModal />
    </div>
  );
};

export default Page;
