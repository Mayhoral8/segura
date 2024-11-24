"use client"

import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";

const Wallets = () => {
  const router = useRouter()
  function createData(currency, buying, selling) {
    return { currency, buying, selling };
  }

  // Array of account data
  const rows = [
    createData("EUR", "#825", "#1890"),
    createData("GBP", "#2182", "#2270"),
    createData("USD", "#1723", "#1760"),
  ];

  const viewWallet = ()=>{
    router.push("wallets/wallet/add4352_422s1")
  }
  return (
    <main className="px-10">
      <section className="flex flex-row gap-x-4 overflow-x-auto scrollbar-hide w-full px-2 h-[200px] border items-center rounded-md bg-white">
        <article className="flex flex-col py-2 gap-y-2  h-[180px]  w-[300px] px-4 text-white   bg-[#272643] rounded-md shadow-sm cursor-pointer" onClick={viewWallet} title="Click to view details">
          <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
          <section className="flex flex-col gap-y-4">
            <div className="w-full flex flex-row justify-between ">
              <div className="flex items-center gap-x-1">
                <span>Available Balance</span>
                <IoEyeOutline />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold">$200.0</span>
            </div>

            <article className="flex flex-row justify-between items-center text-sm">
              <div className="flex gap-x-2 text-xs">
                <span>Acct No</span>
                <span>745658999809</span>
              </div>
              {/* <div>
                <button className="text-xs bg-white px-2 rounded-md py-1 text-gray-900">
                  Add Funds+
                </button>
              </div> */}
            </article>
          </section>
        </article>

      
        <article className="flex flex-col py-2 gap-y-2  h-[180px]  w-[300px] px-4 text-white bg-[#2c698d] rounded-md shadow-sm cursor-pointer" title="Click to view details" onClick={viewWallet}>
          <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
          <section className="flex flex-col gap-y-4">
            <div className="w-full flex flex-row justify-between ">
              <div className="flex items-center gap-x-1">
                <span>Available Balance</span>
                <IoEyeOutline />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold">GBP500</span>
            </div>

            <article className="flex flex-row justify-between items-center text-sm">
              <div className="flex gap-x-2">
                <span>Acct No</span>
                <span>745658999809</span>
              </div>
              {/* <div>
                <button className="bg-white px-2 rounded-md py-1 text-gray-900">
                  Add Funds+
                </button>
              </div> */}
            </article>
          </section>
        </article>
        <article className="flex flex-col py-2 gap-y-2  h-[180px]  w-[300px] px-4 text-gray-950  bg-[#bae8e8] rounded-md shadow-sm cursor-pointer" title="Click to view details" onClick={viewWallet}>
          <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
          <section className="flex flex-col gap-y-4">
            <div className="w-full flex flex-row justify-between ">
              <div className="flex items-center gap-x-1">
                <span>Available Balance</span>
                <IoEyeOutline />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold">E500</span>
            </div>

            <article className="flex flex-row justify-between items-center text-sm">
              <div className="flex gap-x-2 text-xs">
                <span>Acct No</span>
                <span>745658999809</span>
              </div>
              {/* <div>
                <button className="bg-white text-xs px-2 rounded-md py-1 text-gray-900">
                  Add Funds+
                </button>
              </div> */}
            </article>
          </section>
        </article>
        <article className="flex flex-col py-2 gap-y-2  h-[180px]  w-[300px] px-4   bg-white  rounded-md border shadow-sm cursor-pointer" title="Click to view details" onClick={viewWallet}>
          <Avatar src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740" />
          <section className="flex flex-col gap-y-4">
            <div className="w-full flex flex-row justify-between ">
              <div className="flex items-center gap-x-1">
                <span>Available Balance</span>
                <IoEyeOutline />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold">#30,050.56</span>
            </div>

            <article className="flex flex-row justify-between items-center text-sm">
              <div className="flex gap-x-2">
                <span>Acct No</span>
                <span>745658999809</span>
              </div>
              {/* <div>
                <button className="bg-white px-2 rounded-md py-1 text-gray-900">
                  Add Funds+
                </button>
              </div> */}
            </article>
          </section>
        </article>
      </section>
      <section className="mt-6 border rounded-md flex flex-col h-32 justify-center px-4 bg-white gap-y-2">
        <span>Quick Actions</span>
        <article className=" rounded-md flex flex-row gap-x-4">
          <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <span>Send Money</span>
            <FiSend />
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <span>Add Funds</span>
            <FiSend />
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <span>Convert Funds</span>
            <FiSend />
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2 border px-2 rounded-sm h-16 w-40 ">
            <span>Send Money</span>
            <FiSend />
          </div>
        </article>
      </section>

      <section className="border rounded-md w-full py-4 mt-6 px-4 bg-white flex flex-col gap-y-2">
        <span>Exchange Rates</span>
        <TableContainer className="w-[80%]">
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="center">Buying</TableCell>
                <TableCell align="center">Selling</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex flex-row gap-x-2 items-center">
                      {i === 0 ? (
                        <Avatar src="" />
                      ) : i === 1 ? (
                        <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
                      ) : (
                        <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
                      )}
                      {row.currency}
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.buying}</TableCell>
                  <TableCell align="center">{row.selling}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};

export default Wallets;
