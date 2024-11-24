"use client";
import React, { useContext, useState, useEffect } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CiSearch } from "react-icons/ci";

const AccountTable = () => {
  const { showAccountDetailsModal, setShowAccountDetailsModal } =
    useContext(ConfigContext);
  const initialRows = [
    createData(1, "1234567890", "Mayowa", "USD", "Active", "False"),
    createData(2, "9876543210", "Jane Doe", "NGN", "Blocked", "True"),
    createData(3, "1122334455", "John Smith", "EUR", "Active", "False"),
    createData(4, "6677889900", "David Mark", "USD", "Active", "False"),
    createData(5, "4433221100", "Alex Johnson", "NGN", "Blocked", "False"),
    createData(6, "9988776655", "Mary Jane", "USD", "Active", "True"),
    createData(7, "5566778899", "Mike Brown", "EUR", "Active", "True"),
    createData(8, "3344556677", "Anna Lee", "NGN", "Blocked", "False"),
    createData(9, "2233445566", "Chris Paul", "USD", "Active", "True"),
    createData(10, "7788990011", "Tim Cook", "EUR", "Active", "False"),
  ];
  const [rows, setRows] = useState(initialRows);
  const [searchInput, setSearchInput] = useState("");
  // Function to create account data
  function createData(id, accNo, name, currency, status, lienStatus) {
    return { id, accNo, name, currency, status, lienStatus };
  }

  // Array of account data

  const filterTable = (accNo) => {
    const newRows = rows.filter((account) => {
      return account.accNo === accNo;
    });
    setRows(newRows);
  };

  const viewAcc = () => {
    setShowAccountDetailsModal(true);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    e.target.value && setRows(initialRows);
  };

  // if(searchInput === ""){
  //   setRows(initialRows)
  // }
  useEffect(() => {
    if (searchInput === "") {
      return setRows(initialRows);
    }
    filterTable(searchInput)
  }, [searchInput]);

  return (
    <main className="px-10">
      <article className="flex flex-row gap-x-4 items-center">
        <span>Search by account number</span>
        <div className="flex flex-row">
          <input
            placeholder="account number"
            className="border w-36 h-8 focus:outline-none px-2"
            value={searchInput}
            onChange={handleSearchInput}
          />
          <CiSearch
            className="bg-[#2c698d] border text-white h-8 w-8 text-xs cursor-pointer"
            onClick={() => filterTable(searchInput)}
          />
        </div>
      </article>
      <section>

      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Acc No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Lien Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={viewAcc}
              >
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  align="center"
                >
                  {row.accNo}
                </TableCell>
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  align="center"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  align="center"
                >
                  {row.currency}
                </TableCell>
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  align="center"
                >
                  {row.status}
                </TableCell>
                <TableCell
                  title="Click to view details"
                  className="cursor-pointer"
                  align="center"
                >
                  {row.lienStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length < 1 &&
      <div className="flex items-center justify-center mt-10 text-xl">
      No Matching Results

      </div>
      }
      </section>

    </main>
  );
};

export default AccountTable;
