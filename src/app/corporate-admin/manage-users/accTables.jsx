"use client";
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { FaNairaSign } from "react-icons/fa6";

const AccTables = ({ users }) => {
  const { showCorporateDetails, setShowCorporateDetails, userContext } =
    useContext(ConfigContext);
  const { setUserInView } = userContext;

  const viewAcc = (user) => {

    setShowCorporateDetails(true);
    console.log(user);
    setUserInView(user);
  };

  return (
    <main className={`px-10 ${showCorporateDetails && "overflow-hidden"} mt-4`}>
      <section>
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Verified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => viewAcc(user)}
                >
                  <TableCell
                    title="Click to view details"
                    className="cursor-pointer"
                    component="th"
                    scope="row"
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    title="Click to view details"
                    className="cursor-pointer"
                    align="center"
                  >
                    {user.username}
                  </TableCell>
                  <TableCell
                    title="Click to view details"
                    className="cursor-pointer"
                    align="center"
                  >
                    {user.firstName}
                  </TableCell>
                  <TableCell
                    title="Click to view details"
                    className="cursor-pointer flex items-center justify-center"
                    align="center"
                  >
                    {/* <FaNairaSign />  */}
                    {user.lastName}
                  </TableCell>
                  <TableCell
                    title="Click to view details"
                    className="cursor-pointer"
                    align="center"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    title="Click to view details"
                    className={`cursor-pointer ${
                      user.verified === true
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                    align="center"
                  >
                    {String(user.verified)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {users?.length < 1 && (
          <div className="flex items-center justify-center mt-10 text-xl">
            No Matching Results
          </div>
        )}
      </section>
    </main>
  );
};

export default AccTables;
