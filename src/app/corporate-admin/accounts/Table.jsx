import { useState } from "react";
import Image from "next/image";
import NoDataImage from "../../../assets/adminDashboard/noData.svg";
import StatusLogo from "../../../assets/adminDashboard/status.svg";
import Left from "../../../assets/adminDashboard/leftArrow.svg";
import Right from "../../../assets/adminDashboard/rightButton.svg";
import Options from "../../../assets/adminDashboard/options.svg";
import ModifyUserProfile from "./ModifyUserProfile";
import ViewUserProfileIcon from "../../../assets/adminDashboard/UserProfileIcon.svg";
import ModifyUserProfileIcon from "../../../assets/adminDashboard/EditUserProfileIcon.svg";
import DeleteUserIcon from "../../../assets/adminDashboard/deleteUserIcon.svg";
import DownArrowIcon from "../../../assets/adminDashboard/DownArrow.svg";

const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [optionsModalIndex, setOptionsModalIndex] = useState(null);
  const [toggleModifyUserProfileModal, setToggleModifyUserProfileModal] =
    useState(false);
  const rowsPerPage = 12;

  // Mock data
  const rows = Array.from({ length: 50 }, (_, index) => ({
    fullname: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 2 === 0 ? "Admin" : "User",
    status: index % 3 === 0 ? "Inactive" : "Active",
    department: index % 4 === 0 ? "HR" : "IT",
  }));

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Paginated Rows
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleToggleModifyUserProfileModal = () => {
    setToggleModifyUserProfileModal(!toggleModifyUserProfileModal);
    setOptionsModalIndex(null);
  };

  const handleToggleOptionsModal = (index) => {
    setOptionsModalIndex(index === optionsModalIndex ? null : index);
  };

  return (
    <div className="w-full">
      <ModifyUserProfile
        toggleModifyUserProfileModal={toggleModifyUserProfileModal}
        handleToggleModifyUserProfileModal={handleToggleModifyUserProfileModal}
      />

      <div
        className="w-full mx-auto bg-white border border-[#F0F0F0] rounded-lg overflow-hidden"
        style={{ minHeight: "70vh" }}
      >
        <table className="w-full border-collapse">
          <thead className="sticky h-[68px] text-[#787878] text-[12px] top-0 bg-white border-b border-[#F0F0F0]">
            <tr>
              <th className="text-left pl-3 font-medium w-[230px]">FULLNAME</th>
              <th className="text-left pl-3 font-medium w-[200px]">EMAIL</th>
              <th className="text-left pl-3 font-medium w-[223px]">ROLE</th>
              <th className="text-left pl-3 font-medium w-[147px]">
                <span className="flex items-center">
                  <Image src={StatusLogo} alt="" className="mr-2" />
                  STATUS
                </span>
              </th>
              <th className="text-left pl-3 font-medium w-[220px]">
                DEPARTMENT
              </th>
              <th className="text-left w-[97px]">OPTIONS</th>
            </tr>
          </thead>
          <tbody className="h-full">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={index}
                  className="border border-[#F0F0F0] text-[14px] text-[#262626] h-[70px]"
                >
                  <td className="p-3 text-gray-700 w-[230px]">
                    {row.fullname}
                  </td>
                  <td className="p-3 text-gray-700 w-[200px]">{row.email}</td>
                  <td className="p-3 text-gray-700 w-[223px]">{row.role}</td>
                  <td className="p-3 text-gray-700 w-[147px]">
                    <div
                      className={`${
                        row.status === "Active"
                          ? "bg-[#E6FFFB] text-[#13C2C2]"
                          : "bg-[#FFF1F0] text-[#F5222D]"
                      } w-max rounded-[4px] px-[8px] py-[3px]`}
                    >
                      {row.status}
                    </div>
                  </td>
                  <td className="p-3 text-gray-700 w-[220px]">
                    {row.department}
                  </td>
                  <td className="p-3 text-right relative">
                    <div
                      className="bg-[#F0F0F0] hover:bg-[#E3F6F5] cursor-pointer transition-all h-[30px] w-[30px] rounded-[15px] grid place-items-center"
                      onClick={() => handleToggleOptionsModal(index)}
                    >
                      <Image src={Options} alt="options" />
                    </div>
                    {optionsModalIndex === index && (
                      <div className="h-[150px] absolute w-[291px] z-40 flex flex-col bg-white right-[10px] -bottom-[140px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] text-[12px]">
                        <div className="w-full flex-grow hover:bg-[#F0F0F0] transition-all flex items-center cursor-pointer px-3 rounded-t-[4px] gap-2">
                          <Image
                            src={ViewUserProfileIcon}
                            alt="view user profile icon"
                          />
                          <p>View Profile</p>
                          <Image
                            src={DownArrowIcon}
                            alt="down arrow"
                            className="ml-auto justify-self-end"
                          />
                        </div>
                        <div
                          className="flex-grow hover:bg-[#F0F0F0] transition-all flex items-center cursor-pointer px-3 gap-2"
                          onClick={handleToggleModifyUserProfileModal}
                        >
                          <Image
                            src={ModifyUserProfileIcon}
                            alt="modify user profile icon"
                          />
                          <p>Modify User Profile</p>
                        </div>
                        <div className="flex-grow hover:bg-[#F0F0F0] transition-all flex items-center px-3 cursor-pointer rounded-b-[4px] gap-2">
                          <Image src={DeleteUserIcon} alt="delete user icon" />
                          <p>Delete User</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col justify-center items-center h-[70vh]">
                    <Image
                      src={NoDataImage}
                      alt="No Data Available"
                      width={150}
                      height={150}
                    />
                    <p>No data</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{ width: "calc(100vw - 260px)" }}
        className="fixed bottom-0 left-[260px] px-[30px]"
      >
        <div className="flex justify-between items-center p-3 w-full bg-[#ffffff] mx-auto">
          <div className="">
            <span className="text-[#595959] text-[14px]">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="bg-[#ffffff] text-gray-700 h-[30px] w-[30px] rounded-[10px] grid place-items-center border-[#BFBFBF] border-[1px]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Image src={Left} alt="left" />
            </button>
            <div className="flex gap-2 items-end">
              {[...Array(totalPages).keys()].map((page) => (
                <div
                  key={page}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`h-[30px] w-[30px] rounded-[10px] grid place-items-center cursor-pointer ${
                    page + 1 === currentPage
                      ? "bg-[#2C698D] text-white"
                      : "bg-[#FFFFFF] text-[#1F1F1F]"
                  }`}
                >
                  {page + 1}
                </div>
              ))}
            </div>
            <button
              className="bg-[#ffffff] text-gray-700 h-[30px] w-[30px] rounded-[10px] grid place-items-center border-[#BFBFBF] border-[1px]"
              disabled={currentPage === totalPages || rows.length === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Image src={Right} alt="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;
