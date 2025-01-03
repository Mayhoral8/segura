import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import noDataImg from "../assets/no-data/empty-img-gray.png";

const TableComponent = ({ tableHeaders, tableValues }) => {
  return (
    <div>
      {tableValues?.length >= 1 ? (
        <TableContainer component={Paper} elevation={0} className="mt-4">
          <Table>
            <TableHead className="bg-[#F3F3F3]">
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell key={index} align="start">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableValues.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "&:first-of-type td, &:first-of-type th": { borderTop: 0 },
                  }}
                >
                  {Object.keys(row).map((key, index) => {
                    const isMiddleCell =
                      index === Math.floor(Object.keys(row).length / 2);
                    return (
                      <TableCell
                        key={index}
                        title="Click to view details"
                        className={`border-t-0 border border-[#F0F0F0] ${
                          row[key] === "Success"
                            ? "text-green-500"
                            : row[key] === "Failed"
                            ? "text-red-400"
                            : ""
                        } cursor-pointer ${
                          isMiddleCell
                            ? "border-l border-r border-[#F0F0F0]"
                            : ""
                        }`}
                        align="start"
                      >
                        <span
                          className={`${
                            key === "status" && "py-1 px-1 rounded-sm"
                          } ${
                            row[key] === "Failed"
                              ? "text-red-400 bg-[#FFF1F0]"
                              : row[key] === "Success"
                              ? "bg-[#F6FFED] text-green-400"
                              : null
                          }`}
                        >
                          {row[key]}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[300px] w-full mx-auto bg-white mt-4">
          <Image
            src={noDataImg.src}
            width={100}
            height={100}
            className="flex items-center mx-auto justify-center"
            alt="no-data"
          />
          <span className="text-sm">No Data</span>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
