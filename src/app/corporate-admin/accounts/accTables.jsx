"use client";
import React, { useContext} from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { FaNairaSign } from "react-icons/fa6";

const AccountTable = () => {
  
  const {
    showAccountDetailsModal,
    setShowAccountDetailsModal,
    accountsContext,
  } = useContext(ConfigContext);
  const { accounts } = accountsContext;
  
  const viewAcc = () => {
    setShowAccountDetailsModal(true);
  };

  return (
    <main
      className={`px-10 ${showAccountDetailsModal && "overflow-hidden"} mt-4`}
    >
      <section>
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Account Number</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Account Balance</TableCell>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((row, i) => (
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
                    className="cursor-pointer flex items-center justify-center"
                    align="center"
                  >
                    {/* <FaNairaSign /> {row.accBalance} */}
                    {row.accBalance}
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
                    className={`cursor-pointer ${
                      row.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                    align="center"
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {accounts.length < 1 && (
          <div className="flex items-center justify-center mt-10 text-xl">
            No Matching Results
          </div>
        )}
      </section>
    </main>
  );
};

export default AccountTable;
