"use client";
import React, { useState } from "react";
import AddNewUserModal from "./addNewUserModal";
import Table from "./Table";
import Topbar from "../topbar"
const Page = () => {
  const [toggleNewUserModal, setToggleNewUserModal] = useState(false);

  const handleToggleNewUserModal = () => {
    setToggleNewUserModal(!toggleNewUserModal);
  };

  return (
    <>
    <Topbar page="Account Management"/>
    <div className="px-[30px] min-h-[90vh] pb-[70px]">
      <AddNewUserModal
        toggleNewUserModal={toggleNewUserModal}
        handleToggleNewUserModal={handleToggleNewUserModal}
      />
      <section className="h-[57px] bg-white w-full my-4 flex gap-x-10 px-2 rounded-md text-[#8C8C8C] text-sm">
        <article className="border-b-2 border-[#2C698D] text-[#2C698D] flex items-end w-32 justify-center">
          <h2 className="pb-2 font-semibold ">All Members</h2>
        </article>
        <article className=" h-full flex items-end w-32 justify-center">
          <h2 className="pb-2 ">Admin</h2>
        </article>
        <article className=" h-full flex items-end w-32 justify-center">
          <h2 className="pb-2 ">Regular users</h2>
        </article>
        <article className=" h-full flex items-end w-32 justify-center">
          <h2 className="pb-2 ">Pending Users</h2>
        </article>
        <button
          className="h-[36px] w-[130px] rounded-[4px] bg-[#2C698D] text-white my-auto self-center ml-auto justify-self-end"
          onClick={() => handleToggleNewUserModal()}
        >
          Add New User
        </button>
      </section>
      <Table />
    </div>
    </>

  );
};

export default Page;
