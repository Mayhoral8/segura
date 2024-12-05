"use client"
import React from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TransactionsHistory = () => {
  function createData(date, senderReceiver, amount, description, status) {
    return { date, senderReceiver, amount, description, status };
  }
  const rows = [
    createData("Nov 14", "Mayowa", "-$7", "Transfer", "Successful"),
    createData("Nov 14", "Jane Doe", "+$50", "Salary", "Successful"),
    createData("Nov 13", "John Smith", "-$20", "Payment", "Failed"),
    createData("Nov 12", "David Mark", "-$15", "Subscription", "Successful"),
    createData("Nov 11", "Alex Johnson", "+$30", "Refund", "Pending"),
    createData("Nov 10", "Mary Jane", "-$5", "Coffee", "Successful"),
    createData("Nov 10", "Mike Brown", "+$100", "Loan", "Successful"),
    createData("Nov 09", "Anna Lee", "-$25", "Groceries", "Successful"),
    createData("Nov 08", "Chris Paul", "-$12", "Transport", "Failed"),
    createData("Nov 08", "Tim Cook", "+$500", "Bonus", "Successful"),
  ];
  return (
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Sender/Receiver</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className='Click to view details' component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.senderReceiver}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell sx={{color: row.status === "Failed" ? "red" : row.status === "Pending" ? "yellow" : "green"}} align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default TransactionsHistory