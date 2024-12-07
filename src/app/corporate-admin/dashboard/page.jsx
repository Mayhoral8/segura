"use client"
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiMiniUser } from "react-icons/hi2";
import { FaCoins } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { FaClock } from "react-icons/fa";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSession } from "next-auth/react"



const Dashboard = () => {
  const { data: session, status } = useSession()

  console.log(session);
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
    <div className="px-10 w-full">
    
      <section className="flex flex-row lg:justify-between mt-4 justify-center gap-y-2 lg:gap-y-0 gap-x-4 flex-wrap lg:flex-nowrap just">
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%]  h-24 items-center px-4 gap-x-4">
          <div className="bg-[#bae8e8] border rounded-full h-10 w-10 justify-center flex items-center">
            <HiMiniUser className="text-[#2C698D]" />
          </div>
          <div className="]">
            <h2 className="font-bold text-base">500,000</h2>
            <h1 className="lg:text-[10px] text-[8px]">Active Accounts</h1>
            <div className="lg:text-[10px] text-[8px]">
              <span>+23% </span>
              <span>since last month</span>
            </div>
          </div>
        </article>
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%] h-24 items-center px-4 gap-x-4">
          <div className="bg-[#ffc22736]   border rounded-full h-10 w-10 justify-center flex items-center">
            <FaCoins className="text-[#FFC327]" />
          </div>
          <div className="]">
            <h2 className="font-bold text-base">500,000</h2>
            <h1 className="lg:text-[10px] text-[8px]">Funds processed</h1>
            <div className="lg:text-[10px] text-[8px]">
              <span>+23% </span>
              <span>since last month</span>
            </div>
          </div>
        </article>
        <article className="bg-white flex flex-row border lg:w-[25%] w-[45%] h-24 items-center px-4 gap-x-4">
          <div className="bg-[#f292392d]   border rounded-full h-10 w-10 justify-center flex items-center">
            <FaClock className="text-[#F29339]" />
          </div>
          <div className="]">
            <h2 className="font-bold text-base">20,000</h2>
            <h1 className="lg:text-[10px] text-[8px]">Transactions made</h1>
            <div className="lg:text-[10px] text-[8px]">
              <span>+20% </span>
              <span>Refund Requests</span>
            </div>
          </div>
        </article>
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%] h-24 items-center px-4 gap-x-4">
          <div className="bg-[#4a89571a]   border rounded-full h-10 w-10 justify-center flex items-center">
            <CiCreditCard1 className="text-[#4A8957]" />
          </div>
          <div className="]">
            <h2 className="font-bold text-base">20+</h2>
            <h1 className="lg:text-[10px] text-[8px]">Refund requests</h1>
            <div className="lg:text-[10px] text-[8px]">
              <span>+20% </span>
              <span>since last month</span>
            </div>
          </div>
        </article>
      </section>

      <article className="mt-4 bg-white">
        <span className="ml-2 text-lg font-semibold">Report</span>
        {/* <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: "x" }]} // Use "month" for x-axis
          series={[
            {
              dataKey: "y", // Link to y values in the dataset
            },
          ]}
          width={500}
          height={300}
          sx={{
            color: "#2c698d",
          }}
        /> */}
        <BarChart
          xAxis={[
            {
              colorMap: {
                type: 'piecewise',
                thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                colors: ['#2c698d'],
              },
              id: "barCategories",
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              scaleType: "band",
            },
            
          ]}
          series={[
            {
              data: [
                1000, 2300, 1500, 5000, 2300, 4000, 1000, 1800, 1500, 1000,
                3200, 1500,
              ],
            },
          ]}
          width={700}
          height={300}
          sx={{
            color: "#2c698d",
          }}
        />
      </article>

      <section className="mt-4 bg-white">
        <span className="text-lg ">Transactions</span>
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
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.senderReceiver}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell sx={{color: row.status === "Failed" ? "red" : row.status === "Pending" ? "orange" : "green"}} align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default Dashboard;
