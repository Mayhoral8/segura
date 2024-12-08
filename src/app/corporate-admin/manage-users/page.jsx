"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import UserTable from "./userTable";
import CorporateDetailsModal from "../../corporate-admin/manage-users/CorporateDetailsModal";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const { showAccountDetailsModal, userContext } = useContext(ConfigContext);

  const { userInView, setUserInview } = userContext;

  function createData(id, userName, firstName, email, corporateEmail, status) {
    return { id, userName, firstName, email, corporateEmail, status };
  }

  const initialRows = [
    createData(1, "segun", "segun", "dev@example.com", "22-05-2024", "true"),
    createData(
      2,
      "janedoe",
      "Jane Doe",
      "dev@example.com",
      "22-05-2024",
      "true"
    ),
    createData(
      3,
      "johnsmith",
      "John Smith",
      "dev@example.com",
      "22-05-2024",
      "false"
    ),
    createData(
      4,
      "davidmark",
      "David Mark",
      "dev@example.com",
      "22-05-2024",
      "true"
    ),
    createData(
      5,
      "alexjohnson",
      "Alex Johnson",
      "dev@example.com",
      "22-05-2024",
      "false"
    ),
    createData(
      6,
      "maryjane",
      "Mary Jane",
      "dev@example.com",
      "22-05-2024",
      "false"
    ),
    createData(
      7,
      "mikebrown",
      "Mike Brown",
      "dev@example.com",
      "22-05-2024",
      "true"
    ),
    createData(
      8,
      "annalee",
      "Anna Lee",
      "dev@example.com",
      "22-05-2024",
      "true"
    ),
    createData(
      9,
      "2233445566",
      "Chris Paul",
      "dev@example.com",
      "22-05-2024",
      "true"
    ),
    createData(
      10,
      "timcook",
      "Tim Cook",
      "dev@example.com",
      "22-05-2024",
      "false"
    ),
  ];

  const [rows, setRows] = useState(initialRows);

  const filterTable = (accNo) => {
    const newRows = rows.filter((account) => {
      return account.accNo === accNo;
    });
    setRows(newRows);
  };
  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/corporateUsers?page=0&size=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
          },
        }
      );
      const responseData = await response.json();
      return responseData;
      console.log(responseData);
    } catch (err) {
      return err.message;
    }
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  // Function to create account data

  return (
    <div className={`${showAccountDetailsModal && "overflow-hidden"}`}>
      <section className="flex flex-row justify-between px-10">
        <article className="">
          <div className="text-2xl font-semibold mb-5">Manage Users</div>
          <Link href="/corporateAdmin/manage-users/addUser">
            <div className="mb-5">
              <button className="bg-[#2C698D] text-white p-3 rounded-md flex items-center">
                <span className="text-2xl mr-2">+</span> Add User
              </button>
            </div>
          </Link>
        </article>
      </section>
      <UserTable users={users?.data?.content} />
      <CorporateDetailsModal />
    </div>
  );
};

export default Page;
