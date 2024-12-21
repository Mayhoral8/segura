"use client";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiMiniUser } from "react-icons/hi2";
import { TbMoneybag } from "react-icons/tb";
import { TbArrowsExchange } from "react-icons/tb";
import { useSession } from "next-auth/react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaMoneyBills } from "react-icons/fa6";
import TopBar from "../topbar";

const Dashboard = () => {
  const { data: session, status } = useSession();

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

  const payments = [
    {
      month: "Mon",
      uv: 4000,
      pv: 2400,
      amt: "$2400",
    },
    {
      month: "Tue",
      uv: 3000,
      pv: 1398,
      amt: "$2210",
    },
    {
      month: "Wed",
      uv: 2000,
      pv: 3000,
      amt: "$2290",
    },
    {
      month: "Thu",
      uv: 2780,
      pv: 4000,
      amt: "$2000",
    },
    {
      month: "Fri",
      uv: 1890,
      pv: 5000,
      amt: "$2181",
    },
    {
      month: "Sat",
      uv: 2390,
      pv: 7000,
      amt: "$2500",
    },
    {
      month: "Sun",
      uv: 2390,
      pv: 6400,
      amt: "$2500",
    },
  ];

  return (
    <>
      <TopBar page="Dashboard"/>
    <main className="px-8 w-full bg-[#F0F0F0] mt-2">
      <section className="flex flex-row lg:justify-between  justify-center gap-y-2 lg:gap-y-0 gap-x-4 flex-wrap lg:flex-nowrap just bg-[#F0F0F0]">
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%]  h-24 items-center px-4 ">
          <div className="flex flex-col gap-y-2">
            <div>
              <h1 className="lg:text-[10px] text-[8px] text-[#787878]">
                Active Accounts
              </h1>
              <div className="flex items-center gap-x-1">
                <div className="bg-[#E6F7FF] border rounded-full h-6 w-6 justify-center flex items-center">
                  <HiMiniUser className="text-[#1890FF]" />
                </div>

                <h2 className="font-bold text-base">500,000</h2>
              </div>
            </div>
            <div className="lg:text-[10px] text-[8px] flex gap-x-1 items-center">
              <span className="bg-[#E6F7FF] text-[#1890FF] py-1 px-2 rounded-md ">
                +23%{" "}
              </span>
              <span className="text-[#787878]">
                Extra in the last one month
              </span>
            </div>
          </div>
        </article>
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%]  h-24 items-center px-4 ">
          <div className="flex flex-col gap-y-2">
            <div>
              <h1 className="lg:text-[10px] text-[8px] text-[#787878]">
                Funds Processed
              </h1>
              <div className="flex items-center gap-x-1">
                <div className="bg-[#DAFFE5] border rounded-full h-6 w-6 justify-center flex items-center">
                  <TbMoneybag className="text-[#09DD49]" />
                </div>

                <h2 className="font-bold text-base">500,000</h2>
              </div>
            </div>
            <div className="lg:text-[10px] text-[8px] flex gap-x-1 items-center">
              <span className="bg-[#DAFFE5] text-[#09DD49] py-1 px-2 rounded-md">
                +23%{" "}
              </span>
              <span className="text-[#787878]">
                Extra in the last one month
              </span>
            </div>
          </div>
        </article>
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%]  h-24 items-center px-4 ">
          <div className="flex flex-col gap-y-2">
            <div>
              <h1 className="lg:text-[10px] text-[8px] text-[#787878]">
                Transactions Made
              </h1>
              <div className="flex items-center gap-x-1">
                <div className="bg-[#FFF7E6] border rounded-full h-6 w-6 justify-center flex items-center">
                  <TbArrowsExchange className="text-[#FA8C16]" />
                </div>

                <h2 className="font-bold text-base">500,000</h2>
              </div>
            </div>
            <div className="lg:text-[10px] text-[8px] flex gap-x-1 items-center">
              <span className="bg-[#FFF7E6] text-[#FA8C16] py-1 px-2 rounded-md">
                +23%{" "}
              </span>
              <span className="text-[#787878]">
                Extra in the last one month
              </span>
            </div>
          </div>
        </article>
        <article className=" bg-white flex flex-row border lg:w-[25%] w-[45%]  h-24 items-center px-4 ">
          <div className="flex flex-col gap-y-2">
            <div>
              <h1 className="lg:text-[10px] text-[8px] text-[#787878]">
                Refunds Request
              </h1>
              <div className="flex items-center gap-x-1">
                <div className="bg-[#E6F7FF] border rounded-full h-6 w-6 justify-center flex items-center">
                  <FaMoneyBills className="text-[#CF1322]" />
                </div>

                <h2 className="font-bold text-base">500,000</h2>
              </div>
            </div>
            <div className="lg:text-[10px] text-[8px] flex gap-x-1 items-center">
              <span className="bg-[#FFCCC7] text-[#CF1322] py-1 px-2 rounded-md">
                +23%{" "}
              </span>
              <span className="text-[#787878]">
                Extra in the last one month
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-4  flex flex-row gap-x-4">
        <article className=" flex flex-col gap-y-2   py-2 w-[60%]   h-[350px]">
          <span className="font-medium">Revenue Flow</span>
          <div className="bg-white shadow-sm">
            <ResponsiveContainer height={300} width="100%">
              <AreaChart data={payments} className="">
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40A9FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#40A9FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003A8C7A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#003A8C7A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis
                  tickSize={0}
                  axisLine={false}
                  className="text-xs translate-x-[-20px]"
                />
                <XAxis
                  dataKey="month"
                  tickSize={0}
                  axisLine={false}
                  className="text-xs translate-y-[20px]"
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#0050B3"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  className="border"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#1890FF"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="w-[45%] mt-2">
          <span className=" font-medium ">Analytics Report</span>
          <div className="border w-[100%] mt-2 bg-white flex flex-col">
            <div className="flex justify-between text-xs items-center border py-4 px-2">
              <span className="">Business Risk Cases</span>
              <span>+45.14%</span>
            </div>
            <div className="flex justify-between text-xs items-center border py-4 px-2">
              <span className="">Business Risk Cases</span>
              <span>0.58%</span>
            </div>
            <div className="flex justify-between text-xs items-center border py-4 px-2">
              <span className="">Business Risk Cases</span>
              <span>Low</span>
            </div>
          </div>
        </article>
      </section>

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
                  <TableCell
                    sx={{
                      color:
                        row.status === "Failed"
                          ? "red"
                          : row.status === "Pending"
                          ? "orange"
                          : "green",
                    }}
                    align="right"
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
    </>

  );
};

export default Dashboard;
